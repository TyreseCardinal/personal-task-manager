<template>
  <div :class="['sidebar', { 'collapsed-sidebar': collapsed }]">
    <div class="sidebar-content">
      <!-- Logo -->
      <img src="@/assets/logo.png" width="50px" height="50px" class="logo" alt="My logo" />

      <!-- Spacer -->
      <hr :style="{ width: collapsed ? '50px' : '150px' }" class="sidebar-divider" />

      <!-- Navigation Links -->
      <router-link to="/" class="sidebar-link" :class="{ active: isActive('/') }">
        <i :class="['mdi', 'mdi-home']" class="icon" />
        <span class="sidebar-text" v-if="!collapsed">Home</span>
      </router-link>

      <!-- Tasks -->
      <router-link to="/tasks" class="sidebar-link" :class="{ active: isActive('/tasks') }">
        <i :class="['mdi', 'mdi-format-list-checks']" class="icon" />
        <span class="sidebar-text" v-if="!collapsed">Tasks</span>
      </router-link>

      <!-- Projects -->
      <router-link to="/projects" class="sidebar-link" :class="{ active: isActive('/projects') }">
        <i :class="['mdi', 'mdi-folder-outline']" class="icon" />
        <span class="sidebar-text" v-if="!collapsed">Projects</span>
      </router-link>

      <!-- Timeline -->
      <router-link to="/timeline" class="sidebar-link" :class="{ active: isActive('/timeline') }">
        <i :class="['mdi', 'mdi-chart-timeline-variant']" class="icon" />
        <span class="sidebar-text" v-if="!collapsed">Timeline</span>
      </router-link>

      <!-- Calendar -->
      <router-link to="/calendar" class="sidebar-link" :class="{ active: isActive('/calendar') }">
        <i :class="['mdi', 'mdi-calendar-month']" class="icon" />
        <span class="sidebar-text" v-if="!collapsed">Calendar</span>
      </router-link>

      <!-- Profile -->
      <router-link to="/profile" class="sidebar-link" :class="{ active: isActive('/profile') }">
        <i :class="['mdi', 'mdi-account']" class="icon" />
        <span class="sidebar-text" v-if="!collapsed">Profile</span>
      </router-link>

      <!-- Spacer between Profile and Collapse -->
      <div class="sidebar-divider"></div>

      <!-- Settings -->
      <router-link to="/settings" class="sidebar-link" :class="{ active: isActive('/settings') }">
        <i :class="['mdi', 'mdi-cog']" class="icon" />
        <span class="sidebar-text" v-if="!collapsed">Settings</span>
      </router-link>

      <!-- Logout Button -->
      <button class="sidebar-link logout-button" @click="logout">
        <i :class="['mdi', 'mdi-logout']" class="icon" />
        <span class="sidebar-text" v-if="!collapsed">Logout</span>
      </button>

      <!-- Collapse Button -->
      <button @click="$emit('toggle')" class="toggle-button">
        <i :class="['mdi', collapsed ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left']" class="icon" />
      </button>
    </div>
  </div>
</template>

<script>
import auth from '@/services/auth';

export default {
  props: {
    collapsed: Boolean,
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
    async logout() {
      try {
        await axios.post('/auth/logout'); // Call your logout API endpoint
        localStorage.removeItem('access_token'); // Clear the access token from localStorage
        this.$route.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
        // Optionally handle the error (show a message to the user)
      }
    },
  },
};
</script>

<style scoped>
@import '../styles/scss/sidebar.scss';
</style>
