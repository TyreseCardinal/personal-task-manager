// services/tokenService.js
import VueCookies from 'vue-cookies';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import auth from './auth';

const tokenService = {
  storeTokens(accessToken, refreshToken, rememberMe) {
    const accessTokenExpiry = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60; // 7 days or 1 hour in seconds

    // Set access token with correct expiry
    VueCookies.set('access_token', accessToken, {
      expires: new Date(Date.now() + accessTokenExpiry * 1000), // absolute expiry time
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });

    if (rememberMe) {
      VueCookies.set('refresh_token', refreshToken, {
        expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // 7 days for refresh token
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });
    } else {
      VueCookies.remove('refresh_token');
    }
  },

  clearTokens() {
    VueCookies.remove('access_token');
    VueCookies.remove('refresh_token');
  },

  isTokenStored() {
    return VueCookies.isKey('access_token');
  },

  getToken() {
    return VueCookies.get('access_token');
  },

  async refreshToken() {
    const refreshToken = VueCookies.get('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    try {
      const response = await axios.post('/auth/refresh', { refresh_token: refreshToken });
      const { access_token } = response.data;
      this.storeTokens(access_token, refreshToken, true); // Save the new tokens
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      throw new Error('Failed to refresh access token');
    }
  },


  async validateAccessToken() {
    const accessToken = this.getToken();
    if (accessToken && !this.isTokenExpired(accessToken)) {
      return true;
    }

    const refreshToken = VueCookies.get('refresh_token');
    if (refreshToken) {
      try {
        await this.refreshToken();
        return true;
      } catch (error) {
        this.clearTokens();
      }
    }

    return false;
  },

  isTokenExpired(token) {
    if (!token) return true;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  },

  startTokenRefreshTimer() {
    const accessToken = this.getToken();
    if (!accessToken) return;

    const decodedToken = jwtDecode(accessToken);
    const expiresIn = decodedToken.exp * 1000 - Date.now(); // Time in milliseconds

    // Refresh the token 1 minute before it expires
    const refreshTime = expiresIn - 60000;

    if (refreshTime > 0) {
      setTimeout(async () => {
        try {
          await this.refreshToken();
          this.startTokenRefreshTimer(); // Restart timer after successful refresh
        } catch (error) {
          console.error('Failed to refresh token:', error);
          auth.logout(); // Log the user out if refresh fails
        }
      }, refreshTime);
    }
  },
};

export default tokenService;
