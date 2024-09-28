import axios from '@/plugins/axios';
import VueCookies from 'vue-cookies';
import { jwtDecode } from 'jwt-decode'; // Make sure to import jwt-decode

const auth = {
  async login(credentials, rememberMe) {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { access_token, refresh_token } = response.data;

      // Store tokens with appropriate expiry based on rememberMe
      this.storeTokens(access_token, refresh_token, rememberMe);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data.message || 'Login failed');
    }
  },

  storeTokens(accessToken, refreshToken, rememberMe) {
    const accessTokenExpiry = rememberMe ? '7d' : '1h'; // Set expiry based on rememberMe

    // Store access token
    VueCookies.set('access_token', accessToken, {
      expires: accessTokenExpiry,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });

    // Store refresh token if rememberMe is checked, otherwise remove it
    if (rememberMe) {
      VueCookies.set('refresh_token', refreshToken, {
        expires: '7d', // Keep refresh token for a week
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });
    } else {
      VueCookies.remove('refresh_token'); // Remove refresh token if not checked
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

      // Store the new access token
      VueCookies.set('access_token', new_access_token, {
        expires: '1h',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });

      return new_access_token;
    } catch (error) {
      throw new Error('Failed to refresh access token');
    }
  },

  async validateAccessToken() {
    const accessToken = this.getToken();
    if (accessToken && !this.isTokenExpired(accessToken)) {
      return true; // Token is valid
    }

    const refreshToken = VueCookies.get('refresh_token');
    if (refreshToken) {
      try {
        await this.refreshToken(); // Attempt to refresh token
        return true; // Successfully refreshed
      } catch (error) {
        this.logout(); // If refresh fails, log the user out
      }
    }

    return false; // No valid access token or refresh token
  },

  // Move isTokenExpired inside the auth object
  isTokenExpired(token) {
    if (!token) return true; // Consider no token as expired

    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      const currentTime = Date.now() / 1000; // Get current time in seconds

      return decodedToken.exp < currentTime; // Return true if token has expired
    } catch (error) {
      return true; // In case of an error, treat token as expired
    }
  }
};

// Use default export for the auth object
export default auth; 
