// Get all tasks for a specific user
export const getTasks = async (userEmail) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Filter tasks by user email
  return tasks.filter(task => task.userEmail === userEmail);
};

export const createTask = async (taskData, userEmail) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const newTask = {
    id: Date.now(), // unique ID
    ...taskData,
    userEmail, // Associate task with user
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  return newTask;
};
// Update a task
export const updateTask = async (taskId, taskData, userEmail) => {
  // Get existing tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Find the task to update
  const taskIndex = tasks.findIndex((task) => task.id === taskId && task.userEmail === userEmail);

  if (taskIndex === -1) {
    throw new Error("Task not found or access denied");
  }

  // Update the task
  tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };

  // Save updated tasks back to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  return tasks[taskIndex];
};

export const deleteTask = async (taskId, userEmail) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const taskIndex = tasks.findIndex(
    (task) => String(task.id) === String(taskId) && task.userEmail === userEmail,
  );


  console.log("👉 Found index:", taskIndex);

  if (taskIndex === -1) {
    throw new Error("Task not found or access denied");
  }

  tasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  return { message: "Task deleted successfully" };
};
