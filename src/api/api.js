import axios from "axios";

const API = axios.create({
  baseURL: "https://fc-backend-7o50.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
API.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", config.method?.toUpperCase(), config.url);
    console.log("📍 Base URL:", config.baseURL);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });
    return Promise.reject(error);
  }
);

export default API;
