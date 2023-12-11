import React, { useEffect } from 'react';
import Task from '../Task/Task';
import './TaskList.css';

interface TaskListProps {
  tasks: { text: string; isCompleted: boolean }[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newText: string) => void;
  onToggleCompletion: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit, onToggleCompletion }) => {
  useEffect(() => {
    // Logique à exécuter lorsque tasks est mis à jour
    console.log('Tasks have been updated:', tasks);
  }, [tasks]);

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
          onEdit={(newText) => onEdit(index, newText)}
          onToggleCompletion={() => onToggleCompletion(index)}
        />
      ))}
    </ul>
  );
};

export default TaskList;
