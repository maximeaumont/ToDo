// Task.tsx

import React, { useState } from 'react';
import './Task.css';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

interface TaskProps {
  task: { text: string; dueDate?: Date; isCompleted: boolean };
  onDelete: () => void;
  onEdit: (newText: string, newDate?: Date) => void;
  onToggleCompletion: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onEdit, onToggleCompletion }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = () => {
    const newText = prompt("Edit Task", task.text);
    const newDate = task.dueDate;
    if (newText !== null) {
      onEdit(newText, newDate);
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
      <span>{task.text.length > 40 ? `${task.text.substring(0, 40)}...` : task.text}</span>
      <div className="edit-delete-container">
        <EditButton onClick={openEditModal} />
        <DeleteButton onClick={onDelete} />
      </div>
      <EditTaskModal isOpen={isEditModalOpen} onClose={closeEditModal} task={task} onSave={(updatedTask) => onEdit(updatedTask.text, updatedTask.dueDate)} />
    </li>
  );
};

export default Task;
