import axios from "axios";

function normalizeBaseUrl(url) {
  if (!url) return url;
  // Ensure trailing /api
  const trimmed = url.replace(/\/$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

const envBase = process.env.REACT_APP_API_URL;
const defaultBase = process.env.NODE_ENV === "production"
  ? "https://fc-backend-7o50.onrender.com/api"  // Your actual backend URL
  : "http://localhost:5000/api";

const API = axios.create({
  baseURL: normalizeBaseUrl(envBase) || defaultBase,
  withCredentials: false,
  timeout: 60000  // Increased timeout to 60 seconds
});

// Add request interceptor for debugging
API.interceptors.request.use((config) => {
  console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
  console.log('📍 Base URL:', config.baseURL);
  return config;
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL
    });
    
    // Provide more helpful error messages
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timed out. Please check your connection and try again.';
    } else if (!error.response) {
      error.message = 'Network error. Please check if the backend service is running.';
    }
    
    return Promise.reject(error);
  }
);

export default API;
