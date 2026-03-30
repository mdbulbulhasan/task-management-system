import React, { useEffect, useState } from "react";

import { getTasks, createTask, updateTask, deleteTask } from "../APIs/task";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaslkForm";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../AuthenticationPage/Authentication";

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [layout, setLayout] = useState("grid");

  useEffect(() => {
    const loadTask = async () => {
      if (user?.email) {
        const data = await getTasks(user.email);
        setTasks(data);
      }
    };
    loadTask();
  }, [user]);

  const handleSubmitTask = async (task) => {
    if (!user?.email) return;

    if (task.id) {
      await updateTask(task.id, task, user.email);
    } else {
      await createTask(task, user.email);
    }
    const updateTasks = await getTasks(user.email);
    setTasks(updateTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = async (id) => {
    if (!user?.email) return;

    await deleteTask(id, user.email);

    const updateTasks = await getTasks(user.email);
    setTasks(updateTasks);
    console.log("Task deleted:", id);
  };

  return (
    <div className="flex">
      
      <Sidebar layout={layout} setLayout={setLayout} />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Navbar />
        <TaskForm onSubmit={handleSubmitTask} editingTask={editingTask} />
        <div
          className={
            layout === "grid" ? "grid grid-cols-3 gap-4" : "flex flex-col"
          }
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
