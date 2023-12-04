// EditTaskModal.tsx
import React, { useState } from 'react';
import './EditTaskModal.css';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: string;
  onSave: (updatedTask: string) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task, onSave }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

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
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
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
