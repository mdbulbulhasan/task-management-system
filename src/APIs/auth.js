// Register user
export const registerUser = async ({ email, password }) => {
  // Get existing users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  if (users.find((user) => user.email === email)) {
    throw new Error("User already exists");
  }

  // Save new user (plain password for demo purposes)
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  // Create a fake token
  const token = Math.random().toString(36).substring(2);
  return { token };
};

// Login user
export const loginUser = async ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Create a fake token
  const token = Math.random().toString(36).substring(2);
  return { token };
};