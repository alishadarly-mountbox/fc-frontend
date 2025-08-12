import axios from "axios";

const API = axios.create({
    baseURL: "https://fc-backend-7o50.onrender.com/api", // Remove trailing slash
    headers: {
        "Content-Type": "application/json"
    }
});

API.interceptors.request.use(
    (config) => {
        // Remove duplicate /api if present
        config.url = config.url.replace('/api/api/', '/api/');
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
