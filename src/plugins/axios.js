// src/plugins/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Adjust as needed
  withCredentials: true
});

export default instance;