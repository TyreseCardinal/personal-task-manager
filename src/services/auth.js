// services/auth.js
import axios from '@/plugins/axios';
import tokenService from './tokenService';

const auth = {
  async login(credentials, rememberMe) {
    try {
      const response = await axios.post('/auth/login', credentials);

      const { access_token, refresh_token } = response.data;

      if (!access_token || !refresh_token) {
        throw new Error('Login failed: Tokens not found');
      }

      tokenService.storeTokens(access_token, refresh_token, rememberMe);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Invalid credentials';
      throw new Error(errorMessage);
    }
  },

  async validateAccessToken() {
    return await tokenService.validateAccessToken();
  },

  logout() {
    tokenService.clearTokens();
  },

  isAuthenticated() {
    return tokenService.isTokenStored();
  },
};

export default auth;
