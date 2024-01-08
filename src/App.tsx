import { useEffect, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import TaskList from './components/TaskList/TaskList';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import EditListModal from './components/EditListModal/EditListModal'; // Assurez-vous que le chemin d'accès est correct
import './App.css';
import { observer } from 'mobx-react-lite';
import { themeStore } from './components/ThemeStore/ThemeStore';
import ThemeToggleButton from './components/ThemeToggleButton/ThemeToggleButton';

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
        onDeleteList={handleDeleteList} // Passage de la méthode de suppression
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
          <TaskList tasks={tasksByList[currentList]} onDelete={deleteTask} onEdit={editTask} onToggleCompletion={toggleTaskCompletion} />
          <AddTaskForm onAdd={addTask} />
        </>
      )}
      <ThemeToggleButton />
    </div>
  );
}

export default observer(App);


