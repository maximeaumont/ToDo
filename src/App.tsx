// App.tsx
import { useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/TaskList/TaskList';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';

function App() {
  useEffect(() => {
    document.title = 'Todo List'; // Mettez le titre souhaité ici
  }, []);

  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (newTask: string) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = () => {
    console.log('Edit');
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
      <AddTaskForm onAdd={addTask} />
    </div>
  );
}

export default App;
