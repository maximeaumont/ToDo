import React, { useState, useEffect } from 'react';
import './EditTaskModal.css';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: { text: string; dueDate?: Date };
  onSave: (updatedTask: { text: string; dueDate?: Date }) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task, onSave }) => {
  const [updatedTask, setUpdatedTask] = useState({ text: task.text, dueDate: task.dueDate });

  useEffect(() => {
    setUpdatedTask({ text: task.text, dueDate: task.dueDate });
  }, [task]);

  const handleSave = () => {
    onSave(updatedTask);
    onClose();
  };

  return (
    <div className={`edit-task-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span onClick={onClose} className="close-button">
          &times;
        </span>
        <h2>Modifier la tâche</h2>
        <div className="label-container">
          <label>Nouveau nom de la tâche:</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={updatedTask.text}
            onChange={(e) => setUpdatedTask({ ...updatedTask, text: e.target.value })}
          />
        </div>
        <div className="label-container">
          <label>Date de la tâche:</label>
        </div>
        <div className="input-container">
          <input
            type="date"
            value={updatedTask.dueDate ? updatedTask.dueDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: new Date(e.target.value) })}
          />
        </div>
        <div className="button-container">
          <button onClick={handleSave}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
