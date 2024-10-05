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
      tokenService.startTokenRefreshTimer(); // Start refresh timer after storing tokens

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Invalid credentials';
      throw new Error(errorMessage);
    }
  },


  async validateAccessToken() {
    if (!this.isAuthenticated()) { // No need to validate if not authenticated
      return false;
    }

    const isAccessTokenValid = await tokenService.validateAccessToken();

    // If access token is not valid, try to refresh the token
    if (!isAccessTokenValid) {
      try {
        await tokenService.refreshToken();
        return true; // Successfully refreshed, user stays logged in
      } catch (error) {
        console.error('Error refreshing token:', error);
        tokenService.clearTokens(); // Clear tokens on failure to refresh
        return false; // Token refresh failed, redirect to login
      }
    }

    return isAccessTokenValid;
  },



  logout() {
    tokenService.clearTokens();
  },

  isAuthenticated() {
    return tokenService.isTokenStored();
  },
};

export default auth;
