// AddTaskForm.tsx
import React, { useState } from 'react';
import AddButton from '../AddButton/AddButton';
import './AddTaskForm.css';

interface AddTaskFormProps {
  onAdd: (newTask: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      onAdd(newTask);
      setNewTask('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <li className="new-task">
      <input
        type="text"
        placeholder="Nouvelle tâche"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress} // Ajout de l'événement onKeyPress
      />
      <AddButton onClick={addTask} />
    </li>
  );
};

export default AddTaskForm;
