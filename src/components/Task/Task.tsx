// Task.tsx
import React, { useState } from 'react';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import './Task.css';
import EditTaskModal from '../EditTaskModal/EditTaskModal';

interface TaskProps {
  task: string;
  onDelete: () => void;
  onEdit: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onEdit }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <li className="task">
      <input type="checkbox" className="task-checkbox" />
      <span>{task.length > 50 ? `${task.substring(0, 50)}...` : task}</span>
      <div className="edit-delete-container">
        <EditButton onClick={openEditModal} />
        <DeleteButton onClick={onDelete} />
      </div>
      <EditTaskModal isOpen={isEditModalOpen} onClose={closeEditModal} task={task} onSave={onEdit} />
    </li>
  );
};

export default Task;
