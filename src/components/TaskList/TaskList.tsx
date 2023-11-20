// TaskList.tsx
import React from 'react';
import Task from '../Task/Task';
import './TaskList.css';

interface TaskListProps {
  tasks: string[];
  onDelete: (index: number) => void;
  onEdit: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => (
  <ul className="task-list">
    {tasks.map((task, index) => (
      <Task key={index} task={task} onDelete={() => onDelete(index)} onEdit={onEdit} />
    ))}
  </ul>
);

export default TaskList;
