// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null, // Get token from localStorage
    user: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token); // Save token to localStorage
    },
    setUser(state, user) {
      state.user = user;
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post('http://localhost:5000/auth/login', credentials);
      const token = response.data.access_token;

      commit('setToken', token);
      
      // Optional: You can also fetch and commit the user data from a user API
      // const userResponse = await axios.get('/api/user');
      // commit('setUser', userResponse.data);
    },
    logout({ commit }) {
      commit('clearAuth');
    }
  }
});
