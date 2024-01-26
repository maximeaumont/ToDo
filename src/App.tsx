
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import { useEffect, useState, useRef } from 'react';
import NavBar from './components/NavBar/NavBar';
import EditListModal from './components/EditListModal/EditListModal'; 
import './App.css';
import { observer } from 'mobx-react-lite';
import { themeStore } from './components/ThemeStore/ThemeStore';
import ThemeToggleButton from './components/ThemeToggleButton/ThemeToggleButton';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { FaFileImport, FaFileExport } from 'react-icons/fa';
import ListProgress from './components/ListProgressComponent/ListProgressComponent';
import TaskList from './components/TaskList/TaskList';

interface Task {
  text: string;
  isCompleted: boolean;
  dueDate?: Date;
}

function App() {
  const [tasksByList, setTasksByList] = useState<{ [key: string]: Task[] }>({});
  const [currentList, setCurrentList] = useState<string | null>(null);
  const [navVisible, setNavVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedListName, setSelectedListName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatDate = (date?: Date | string | number): string => {
    return date ? new Date(date).toLocaleDateString('fr-FR') : '';
  };
  
  const parseDate = (dateStr: string): Date | undefined => {
    if (!dateStr) return undefined;
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };
  

  const exportToCSV = () => {
    const csvData = Papa.unparse({
      fields: ["listName", "text", "isCompleted", "dueDate"],
      data: Object.entries(tasksByList).flatMap(([listName, tasks]) =>
        tasks.map(task => [listName, task.text, task.isCompleted, formatDate(task.dueDate)])
      ),
    });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "tasks.csv");
  };


  const importFromCSV = (file: File) => {
    Papa.parse(file, {
      encoding: "UTF-8",
      header: true,
      complete: (results) => {
        const importedTasks = results.data.reduce((acc: { [key: string]: Task[] }, row: any) => {
          if (row.listName && row.text) {
            acc[row.listName] = acc[row.listName] || [];
            acc[row.listName].push({
              text: row.text,
              isCompleted: row.isCompleted === "true",
              dueDate: parseDate(row.dueDate)
            });
          }
          return acc;
        }, { ...tasksByList });
        
        setTasksByList(importedTasks);
  
        localStorage.setItem('tasksByList', JSON.stringify(importedTasks));
      }
    });
  };
  


  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      importFromCSV(file);
      event.target.value = '';
    }
  };


  useEffect(() => {
    const savedTasks = localStorage.getItem('tasksByList');
    if (savedTasks) {
      setTasksByList(JSON.parse(savedTasks));
    }
    document.body.className = themeStore.theme;
  }, [themeStore.theme]);

  const addTask = (newTaskText: string) => {
    if (currentList) {
      const newTask = { text: newTaskText, isCompleted: false, dueDate: new Date() };
      const updatedTasks = tasksByList[currentList] ? [...tasksByList[currentList], newTask] : [newTask];
      const newTasksByList = { ...tasksByList, [currentList]: updatedTasks };
      setTasksByList(newTasksByList);
      localStorage.setItem('tasksByList', JSON.stringify(newTasksByList));
    }
  };
  
  const deleteTask = (index: number) => {
    if (currentList) {
      const currentTasks = tasksByList[currentList] || [];
      const updatedTasks = [...currentTasks.slice(0, index), ...currentTasks.slice(index + 1)];
      const newTasksByList = { ...tasksByList, [currentList]: updatedTasks };
      setTasksByList(newTasksByList);
      localStorage.setItem('tasksByList', JSON.stringify(newTasksByList));
    }
  };

  const editTask = (index: number, newText: string, newDate?: Date) => {
    if (currentList && tasksByList[currentList]) {
      const updatedTasks = tasksByList[currentList].map((task, idx) =>
        idx === index ? { ...task, text: newText, dueDate: newDate} : task
      );
      setTasksByList({ ...tasksByList, [currentList]: updatedTasks });
      localStorage.setItem('tasksByList', JSON.stringify({ ...tasksByList, [currentList]: updatedTasks }));
    }
  };
  
  const toggleTaskCompletion = (index: number) => {
    if (currentList && tasksByList[currentList]) {
      const updatedTasks = tasksByList[currentList].map((task, idx) =>
        idx === index ? { ...task, isCompleted: !task.isCompleted } : task
      );
      setTasksByList({ ...tasksByList, [currentList]: updatedTasks });
      localStorage.setItem('tasksByList', JSON.stringify({ ...tasksByList, [currentList]: updatedTasks }));
    }
  };

  const addList = (listName: string) => {
    const newTasksByList = { ...tasksByList, [listName]: [] };
    setTasksByList(newTasksByList);
    localStorage.setItem('tasksByList', JSON.stringify(newTasksByList));
  };

  const handleEditListName = (newName: string) => {
    if (selectedListName && newName && tasksByList[selectedListName]) {
      const updatedTasksByList = { ...tasksByList, [newName]: tasksByList[selectedListName] };
      delete updatedTasksByList[selectedListName];

      setTasksByList(updatedTasksByList);
      localStorage.setItem('tasksByList', JSON.stringify(updatedTasksByList));

      if (currentList === selectedListName) {
        setCurrentList(newName);
      }
    }
    closeEditModal();
  };

  const handleDeleteList = (listName: string) => {
    const updatedTasksByList = { ...tasksByList };
    delete updatedTasksByList[listName];

    setTasksByList(updatedTasksByList);
    localStorage.setItem('tasksByList', JSON.stringify(updatedTasksByList));

    if (currentList === listName) {
      setCurrentList(null);
    }
  };

  const openEditModal = (listName: string) => {
    setSelectedListName(listName);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('tasksByList');
    setTasksByList({});
  };



  return (
    <div className={`app-container ${themeStore.theme}`}>
      <NavBar
        isVisible={navVisible}
        toggleVisibility={() => setNavVisible(!navVisible)}
        lists={Object.keys(tasksByList)}
        onSelectList={setCurrentList}
        onAddList={addList}
        onOpenEditModal={openEditModal}
        onDeleteList={handleDeleteList} 
      />
      <EditListModal 
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        listName={selectedListName}
        onSave={handleEditListName}
      />
      <h1>Todo List - {currentList}</h1>
      {currentList && (
        <>
          <ListProgress tasks={tasksByList[currentList]} />
          <TaskList tasks={tasksByList[currentList]} onDelete={deleteTask} onEdit={editTask} onToggleCompletion={toggleTaskCompletion} />
          <AddTaskForm onAdd={addTask} />
        </>
      )}
      <div className="import-export-buttons">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        <button onClick={() => fileInputRef.current && fileInputRef.current.click()}>
          <FaFileImport /> Import CSV
        </button>
        <button onClick={exportToCSV}>
          <FaFileExport /> Export CSV
        </button>
      </div>

      <ThemeToggleButton />
    </div>
  );
}

export default observer(App);


