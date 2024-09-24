import axios from '@/plugins/axios';
import VueCookies from 'vue-cookies'; // Import VueCookies

const auth = {
  async login(credentials) {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { access_token } = response.data; // Assuming the token is named 'access_token'

      // Store the token in a cookie with proper options
      VueCookies.set(
        'access_token',
        access_token,
        '1h', // Expires in 1 hour
        '/', // Path
        'localhost', // Domain (adjust for production)
        false, // Secure false for dev; change to true for production
        'Lax' // SameSite attribute for dev (None for production)
      );

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
