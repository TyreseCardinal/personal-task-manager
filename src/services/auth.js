import axios from '@/plugins/axios';
import VueCookies from 'vue-cookies';

const auth = {
  async login(credentials, rememberMe) {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { access_token, refresh_token } = response.data;

      const accessTokenExpiry = rememberMe ? '7d' : '1h';

      // Access Token //
      VueCookies.set('access_token', access_token, {
        expires: accessTokenExpiry,
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Change to true in production
        sameSite: 'Lax',
      });

      // Refresh Token //
      VueCookies.set('refresh_token', refresh_token, {
        expires: '7d',
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Change to true in production
        sameSite: 'Lax',
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data.message || 'Login failed');
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
    VueCookies.remove('access_token');
    VueCookies.remove('refresh_token');
  },

  isAuthenticated() {
    return VueCookies.isKey('access_token');
  },

  getToken() {
    return VueCookies.get('access_token');
  },

  async refreshToken() {
    const refreshToken = VueCookies.get('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post('/auth/refresh-token', { refresh_token: refreshToken });
      const { new_access_token } = response.data;

      VueCookies.set('access_token', new_access_token, {
        expires: '1h',
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Change to true in production
        sameSite: 'Lax',
      });

      return new_access_token;
    } catch (error) {
      throw new Error('Failed to refresh access token');
    }
  }
};

export default auth;
