import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Backend URL
  withCredentials: true, // Allows sending cookies with requests
});

// Request interceptor: No need to manually attach tokens
instance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor: Redirect to login on 401 errors
instance.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    window.location.href = '/login'; // Redirect to login if unauthorized
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

export default instance;
