// src/plugins/store.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios'; // Make sure this path is correct

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    token: localStorage.getItem('token') || '',
    message: '',
    uploadMessage: '',
    collapsed: false,
    SIDEBAR_WIDTH: 180,
    SIDEBAR_WIDTH_COLLAPSED: 38,
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    SET_UPLOAD_MESSAGE(state, message) {
      state.uploadMessage = message;
    },
    toggleSidebar(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const response = await axios.get('/tasks');
        commit('SET_TASKS', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async createTask({ dispatch }, taskData) {
      try {
        await axios.post('/tasks', taskData);
        dispatch('fetchTasks');
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask({ dispatch }, taskId) {
      try {
        await axios.delete(`/tasks/${taskId}`);
        dispatch('fetchTasks');
      } catch (error) {
        console.error(error);
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/auth/login', credentials);
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        commit('SET_TOKEN', token);
        commit('SET_MESSAGE', 'Login successful!');
      } catch (error) {
        commit('SET_MESSAGE', error.response.data.message || 'Login failed.');
        throw error; // Ensure the error is thrown so the Vue component can handle it
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/auth/register', userData);
        commit('SET_MESSAGE', response.data.message);
      } catch (error) {
        commit('SET_MESSAGE', error.response.data.message || 'Registration failed.');
      }
    },
    async uploadProfilePicture({ commit }, file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        await axios.post('/users/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        commit('SET_UPLOAD_MESSAGE', 'Profile picture uploaded successfully!');
      } catch (error) {
        commit('SET_UPLOAD_MESSAGE', 'Failed to upload profile picture.');
        console.error(error);
      }
    },
    async updateUser({ commit }, userData) {
      try {
        await axios.put('/users/update', userData);
        commit('SET_MESSAGE', 'User information updated successfully!');
      } catch (error) {
        commit('SET_MESSAGE', error.response.data.message || 'Update failed.');
      }
    },
    async deleteAccount({ commit }) {
      try {
        await axios.delete('/users/delete');
        commit('SET_MESSAGE', 'Account deleted successfully.');
      } catch (error) {
        commit('SET_MESSAGE', error.response.data.message || 'Deletion failed.');
      }
    }
  },
  getters: {
    tasks: (state) => state.tasks,
    isAuthenticated: (state) => !!state.token,
    message: (state) => state.message,
    uploadMessage: (state) => state.uploadMessage,
    sidebarWidth: (state) => `${state.collapsed ? state.SIDEBAR_WIDTH_COLLAPSED : state.SIDEBAR_WIDTH}px`,
    collapsed: (state) => state.collapsed,
  },
});
