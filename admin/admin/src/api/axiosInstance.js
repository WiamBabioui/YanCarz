import axios from 'axios';

const axiosInstance = axios.create({
  // Use a relative path so the Vite proxy handles the CORS
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Read token from localStorage (Remember Me) or sessionStorage (session-only login)
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here
    if (error.response) {
      if (error.response.status === 401) {
        // e.g. trigger logout
        console.error('Unauthorized access - perhaps your session has expired');
      }
      return Promise.reject(error.response.data || new Error(error.response.statusText));
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new Error('No response from server. Please check your network connection.'));
    } else {
      // Something happened in setting up the request
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
