import axios from "axios";

const API = axios.create({
  baseURL: "https://fc-backend-7o50.onrender.com", // Remove /api from here
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle auth
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add request interceptor for debugging
API.interceptors.request.use((config) => {
  console.log("🚀 API Request:", config.method?.toUpperCase(), config.url);
  console.log("📍 Base URL:", config.baseURL);
  return config;
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });

    // Provide more helpful error messages
    if (error.code === "ECONNABORTED") {
      error.message =
        "Request timed out. Please check your connection and try again.";
    } else if (!error.response) {
      error.message =
        "Network error. Please check if the backend service is running.";
    }

    return Promise.reject(error);
  }
);

export default API;
