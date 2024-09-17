import axios from 'axios';
import VueCookies from 'vue-cookies';

// Create Axios instance
const instance = axios.create({
  baseURL: 'http://localhost:5000', // Base URL for both /auth and /api
});

// Request interceptor to add JWT token to headers
instance.interceptors.request.use((config) => {
  if (config.url.startsWith('/api')) { // Only attach token for /api routes
    const token = VueCookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle errors globally
instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    // Handle unauthorized access (e.g., by logging out)
    VueCookies.remove('access_token');
    window.location.href = '/login'; // Redirect to login
  }
  return Promise.reject(error);
});

export default instance;
