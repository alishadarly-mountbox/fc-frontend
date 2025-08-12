import axios from "axios";

const API = axios.create({
  baseURL: "https://fc-backend-7o50.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  }
});

// Add request interceptor with better error handling
API.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method, config.url);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default API;
