// TaskList.tsx

import React, { useEffect } from 'react';
import './TaskList.css';
import Task from '../Task/Task';

interface TaskListProps {
  tasks: { text: string; isCompleted: boolean; dueDate?: Date }[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newText: string, newDate?: Date) => void;
  onToggleCompletion: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit, onToggleCompletion }) => {
  useEffect(() => {
    console.log('Tasks have been updated:', tasks);
  }, [tasks]);

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
          onEdit={(newText, newDate) => onEdit(index, newText, newDate)}
          onToggleCompletion={() => onToggleCompletion(index)}
        />
      ))}
    </ul>
  );
};

export default TaskList;
