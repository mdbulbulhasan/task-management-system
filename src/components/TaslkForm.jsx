import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";

const TaskForm = ({ onSubmit, editingTask }) => {
  // Initialize with editingTask if exists, otherwise defaults
  const [task, setTask] = useState(
    editingTask || {
      title: "",
      description: "",
      status: "Todo",
      priority: "Low",
      dueDate: "",
      category: "",
    },
  );

  // Whenever editingTask changes, reset form safely
  useEffect(() => {
    if (editingTask) {
      // Use functional setState to avoid immediate sync call
      setTask((prev) => ({ ...prev, ...editingTask }));
    } else {
      setTask({
        title: "",
        description: "",
        status: "Todo",
        priority: "Low",
        dueDate: "",
        category: "",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);

    // Reset form if not editing
    if (!editingTask) {
      setTask({
        title: "",
        description: "",
        status: "Todo",
        priority: "Low",
        dueDate: "",
        category: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
      />
      <div className="flex space-x-2 mb-2">
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <DatePicker
        selected={task.dueDate ? new Date(task.dueDate) : null}
        onChange={(date) =>
          setTask((prev) => ({
            ...prev,
            dueDate: date ? date.toISOString() : "",
          }))
        }
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category/Tag"
        value={task.category}
        onChange={handleChange}
        className="border p-2 w-full mb-2 mt-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
