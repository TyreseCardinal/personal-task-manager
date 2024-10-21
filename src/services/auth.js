import axios from '@/plugins/axios';

const auth = {
  async login(credentials) {
    try {
      const response = await axios.post('/auth/login', credentials);
      if (!response.data) {
        throw new Error('Login failed');
      }
      return response.data; // Backend handles cookies, so we return the response here
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Invalid credentials';
      throw new Error(errorMessage);
    }
  },

  async validateToken() {
    // Get the access token from localStorage
    const token = localStorage.getItem('access_token');

    // Check if the token exists
    if (!token) {
      console.error('No access token found');
      return { valid: false, error: 'No token provided' };
    }

    try {
      // Make a POST request to validate the token
      const response = await axios.post('http://localhost:5000/validate-token', { token });

      if (response.data.valid) {
        console.log('Token is valid');
        return { valid: true };
      } else {
        console.error('Token is invalid:', response.data.error);
        return { valid: false, error: response.data.error };
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error message:', error.response.data.error || 'Unknown error');
        return { valid: false, error: error.response.data.error || 'Unknown error' };
      } else if (error.request) {
        console.error('No response received:', error.request);
        return { valid: false, error: 'No response received from server' };
      } else {
        console.error('Error setting up the request:', error.message);
        return { valid: false, error: 'Request setup failed' };
      }
    }
  },
};

export default auth;
