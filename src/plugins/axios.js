import axios from 'axios';
import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Ensure the backend API URL is correct
  withCredentials: true, // Send credentials like cookies if needed
});

// Axios request interceptor to add JWT token to headers
instance.interceptors.request.use((config) => {
  const access_token = Vue.$cookies.get('access_token'); // Use Vue.$cookies to get the token
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
