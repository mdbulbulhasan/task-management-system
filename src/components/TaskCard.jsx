import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColor = {
    Todo: 'bg-gray-200 text-gray-800',
    'In Progress': 'bg-yellow-200 text-yellow-800',
    Done: 'bg-green-200 text-green-800',
  };

  const priorityColor = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

  return (
    <div className="border p-4 rounded shadow-sm mb-4">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-gray-700">{task.description}</p>
      <div className="flex justify-between mt-2">
        <span className={`px-2 py-1 rounded ${statusColor[task.status]}`}>{task.status}</span>
        <span className={`px-2 py-1 rounded ${priorityColor[task.priority]}`}>{task.priority}</span>
      </div>
      <div className="mt-2 flex justify-between text-sm">
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        <div>
          <button onClick={() => onEdit(task)} className="mr-2 text-blue-500">Edit</button>
          <button onClick={() => onDelete(task.id)} className="text-red-500 cursor-pointer">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;