// Task.tsx
import React from 'react';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import './Task.css';

interface TaskProps {
  task: string;
  onDelete: () => void;
  onEdit: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onEdit }) => (
  <li className="task">
    <input type="checkbox" className="task-checkbox" />
    <span>{task.length > 50 ? `${task.substring(0, 50)}...` : task}</span>
    <div className="edit-delete-container">
      <EditButton onClick={onEdit} />
      <DeleteButton onClick={onDelete} />
    </div>
  </li>
);

export default Task;
