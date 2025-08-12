import axios from "axios";

const API = axios.create({
  baseURL: "https://fc-backend-7o50.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  }
});

// Add request interceptor
API.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method, config.url);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return Promise.reject(error);
  }
);

export default API;
