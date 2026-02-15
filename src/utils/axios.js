import axios from "axios";

// add /api here, not in the env variable
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api` || "http://localhost:5000/api",
  // optional: headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
});

export default api;
