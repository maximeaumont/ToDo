import { useEffect, useState, useRef } from 'react';
import NavBar from './components/NavBar/NavBar';
import TaskList from './components/TaskList/TaskList';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import './App.css';
import { observer } from 'mobx-react-lite';
import { themeStore } from './components/ThemeStore/ThemeStore';
import ThemeToggleButton from './components/ThemeToggleButton/ThemeToggleButton';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { FaFileImport, FaFileExport } from 'react-icons/fa';

interface Task {
  text: string;
  isCompleted: boolean;
}

function App() {
  const [tasksByList, setTasksByList] = useState<{ [key: string]: Task[] }>({});
  const [currentList, setCurrentList] = useState<string | null>(null);
  const [navVisible, setNavVisible] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportToCSV = () => {
    const csvData = Papa.unparse({
      fields: ["listName", "text", "isCompleted"],
      data: Object.entries(tasksByList).flatMap(([listName, tasks]) =>
        tasks.map(task => [listName, task.text, task.isCompleted])
      ),
    });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "tasks.csv");
  };

  const importFromCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const importedTasks = results.data.reduce((acc: { [key: string]: Task[] }, row: any) => {
          if (row.listName && row.text) {
            acc[row.listName] = acc[row.listName] || [];
            if (!acc[row.listName].some(task => task.text === row.text)) {
              acc[row.listName].push({ text: row.text, isCompleted: row.isCompleted === "true" });
            }
          }
          return acc;
        }, { ...tasksByList }); 
        setTasksByList(importedTasks);
      }
    });
  };



  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      importFromCSV(file);
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
      const newTask = { text: newTaskText, isCompleted: false };
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

  const editTask = (index: number, newText: string) => {
    if (currentList && tasksByList[currentList]) {
      const updatedTasks = tasksByList[currentList].map((task, idx) =>
        idx === index ? { ...task, text: newText } : task
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
    setTasksByList({ ...tasksByList, [listName]: [] });
  };



  return (
    <div className={`app-container ${themeStore.theme}`}>
      <NavBar
        isVisible={navVisible}
        toggleVisibility={() => setNavVisible(!navVisible)}
        lists={Object.keys(tasksByList)}
        onSelectList={setCurrentList}
        onAddList={addList}
      />
      <h1>Todo List - {currentList}</h1>
      {currentList && (
        <>
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
