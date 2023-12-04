// Task.tsx
import React from 'react';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import './Task.css';

interface TaskProps {
  task: { text: string; isCompleted: boolean };
  onDelete: () => void;
  onEdit: (newText: string) => void;
  onToggleCompletion: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onEdit, onToggleCompletion }) => {
  const handleEdit = () => {
    const newText = prompt("Edit Task", task.text);
    if (newText !== null) {
      onEdit(newText);
    }
  };

  return (
    <li className={`task ${task.isCompleted ? 'completed' : ''}`}>
      <input type="checkbox" className="task-checkbox" checked={task.isCompleted} onChange={onToggleCompletion} />
      <span>{task.text}</span>
      <div className="edit-delete-container">
        <EditButton onClick={handleEdit} />
        <DeleteButton onClick={onDelete} />
      </div>
    </li>
  );
};

export default Task;
