// services/tokenService.js
import VueCookies from 'vue-cookies';
import { jwtDecode } from 'jwt-decode';


const tokenService = {
  storeTokens(accessToken, refreshToken, rememberMe) {
    const accessTokenExpiry = rememberMe ? '7d' : '1d';

    VueCookies.set('access_token', accessToken, {
      expires: accessTokenExpiry,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });

    if (rememberMe) {
      VueCookies.set('refresh_token', refreshToken, {
        expires: '7d',
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
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post('/auth/refresh', { refresh_token: refreshToken });
      const { new_access_token } = response.data;

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
};

export default tokenService;
