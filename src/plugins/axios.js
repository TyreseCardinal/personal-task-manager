// axios.js
import axios from 'axios';
import store from './store'; // Import your Vuex store

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Base URL of your API
});

// Add a request interceptor to attach the token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
