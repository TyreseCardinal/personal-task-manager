// src/plugins/axios.js
import axios from 'axios';

// Create a custom Axios instance
const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Set your base API URL here
  timeout: 10000, // Optional: Set a request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Optional: Default Content-Type
  },
});

// Request interceptor to include JWT token in headers
instance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
instance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Example: Handle unauthorized access
      console.error('Unauthorized access - please log in again.');
      // Handle token refresh logic or redirection if needed
    } else if (error.response && error.response.status === 500) {
      // Example: Handle server errors
      console.error('Server error - please try again later.');
    }
    return Promise.reject(error);
  }
);

export default instance;
