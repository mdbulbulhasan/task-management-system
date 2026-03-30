import axios from "axios";

// Base Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;