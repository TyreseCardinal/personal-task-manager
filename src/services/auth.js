import axios from '@/plugins/axios';

const auth = {
  async login(credentials) {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { token } = response.data;
      this.$cookies.set('access_token', token); // Store the token in a cookie
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

  async logout() {
    this.$cookies.remove('access_token'); // Remove the token
  },

  isAuthenticated() {
    return this.$cookies.isKey('access_token'); // Check if the token exists
  },

  getToken() {
    return this.$cookies.get('access_token'); // Retrieve the token if needed
  }
};

export default auth;
