import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // your backend base URL
  // optional: headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
});

export default api;
