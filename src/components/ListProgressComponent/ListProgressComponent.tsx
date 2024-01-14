import React from 'react';
import './ListProgressComponent.css';

interface ListProgressProps {
  tasks: { text: string; isCompleted: boolean; dueDate?: Date }[];
}

const ListProgress: React.FC<ListProgressProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="list-progress">
      <p>Progression de la liste: {progress.toFixed(2)}%</p>
      <div className="progress-bar-empty">
        <div className="progress-bar-full"
          style={{
            width: `${progress}%`
          }}
        />
      </div>
    </div>
  );
};

export default ListProgress;
