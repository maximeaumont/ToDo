// Task.tsx
import React, { useState } from 'react';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import './Task.css';
import EditTaskModal from '../EditTaskModal/EditTaskModal';

interface TaskProps {
  task: { text: string; isCompleted: boolean };
  onDelete: () => void;
  onEdit: (newText: string) => void;
  onToggleCompletion: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onEdit, onToggleCompletion }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = () => {
    const newText = prompt("Edit Task", task.text);
    if (newText !== null) {
      onEdit(newText);
    }
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <li className={`task ${task.isCompleted ? 'completed' : ''}`}>
      <input type="checkbox" className="task-checkbox" checked={task.isCompleted} onChange={onToggleCompletion} />
      <span>{task.text.length > 50 ? `${task.text.substring(0, 50)}...` : task.text}</span>
      <div className="edit-delete-container">
        <EditButton onClick={openEditModal} />
        <DeleteButton onClick={onDelete} />
      </div>
      <EditTaskModal isOpen={isEditModalOpen} onClose={closeEditModal} task={task.text} onSave={onEdit} />
    </li>
  );
};

export default Task;
