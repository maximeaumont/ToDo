import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import TaskList from './components/TaskList/TaskList';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import './App.css';

interface Task {
  text: string;
  isCompleted: boolean;
}

function App() {
  const [tasksByList, setTasksByList] = useState<{ [key: string]: Task[] }>({});
  const [currentList, setCurrentList] = useState<string | null>(null);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasksByList');
    if (savedTasks) {
      setTasksByList(JSON.parse(savedTasks));
    }
  }, []);

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
    <div className="app-container">
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
    </div>
  );
}

export default App;
