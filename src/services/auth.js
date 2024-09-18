import axios from '@/plugins/axios';
import VueCookies from 'vue-cookies'; // Import VueCookies here

const auth = {
  async login(credentials) {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { access_token } = response.data; // Assuming the token is named 'access_token'
      VueCookies.set('access_token', access_token); // Store the token in a cookie
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Login failed');
    }
  },

  async register(userData) {
    try {
      const response = await axios.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
  },

  logout() {
    VueCookies.remove('access_token'); // Remove the token
  },

  isAuthenticated() {
    return VueCookies.isKey('access_token'); // Check if the token exists
  },

  getToken() {
    return VueCookies.get('access_token'); // Retrieve the token if needed
  }
};

export default auth;
