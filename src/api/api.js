import axios from "axios";

const API = axios.create({
  baseURL: "https://fc-backend-7o50.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

export default API;
