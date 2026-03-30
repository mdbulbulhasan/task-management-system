import React from "react";

const TaskList = ({ tasks, layout }) => {
  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "flex flex-col gap-2"
      }
    >
      {tasks.map((task) => (
        <div key={task.id} className="p-4 bg-white shadow rounded">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;