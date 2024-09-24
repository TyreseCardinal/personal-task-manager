import axios from 'axios';
import Vue from 'vue';
import cookies from 'vue-cookies';

Vue.use(cookies);

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // Ensure credentials are always sent
});

// Request interceptor to add JWT token to headers
instance.interceptors.request.use((config) => {
  if (config.url.startsWith('/api')) {
    const access_token = this.$cookies.get('access_token');
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
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
    Vue.$cookies.remove('access_token');
    window.location.href = '/login'; // Redirect to login
  }
  return Promise.reject(error);
});

export default instance;
