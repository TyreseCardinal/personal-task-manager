<template>
  <div :class="['sidebar', { 'collapsed-sidebar': collapsed }]">
    <div class="sidebar-content">
      <router-link to="/profile" class="sidebar-link" :class="{ active: isActive('/profile') }">
        <i :class="['mdi', 'mdi-account', { 'icon-hidden': collapsed }]" class="icon" />
        <span v-if="!collapsed">Profile</span>
      </router-link>
      <router-link to="/dashboard" class="sidebar-link" :class="{ active: isActive('/dashboard') }">
        <i :class="['mdi', 'mdi-home', { 'icon-hidden': collapsed }]" class="icon" />
        <span v-if="!collapsed">Dashboard</span>
      </router-link>
      <router-link to="/tasks" class="sidebar-link" :class="{ active: isActive('/tasks') }">
        <i :class="['mdi', 'mdi-format-list-checks', { 'icon-hidden': collapsed }]" class="icon" />
        <span v-if="!collapsed">Tasks</span>
      </router-link>
      <router-link to="/projects" class="sidebar-link" :class="{ active: isActive('/projects') }">
        <i :class="['mdi', 'mdi-folder-outline', { 'icon-hidden': collapsed }]" class="icon" />
        <span v-if="!collapsed">Projects</span>
      </router-link>
    </div>
    <button @click="logout" class="logout-button sidebar-link">
      <i :class="['mdi', 'mdi-logout', { 'icon-hidden': collapsed }]" class="icon" />
      <span v-if="!collapsed">Logout</span>
    </button>
    <button @click="$emit('toggle')" class="toggle-button">
      <i class="toggle-btn-icon" :class="['mdi', collapsed ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left']" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: Boolean,
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
    logout() {
      localStorage.removeItem('access_token');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 150px;
  /* Expanded width */
  background-color: #00334e;
  color: #d2b48c;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5rem;
  transition: width 0.3s ease;
  /* Smooth transition */
  float: left;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  /* Full height */
}

.collapsed-sidebar {
  width: 50px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #d2b48c;
  transition: background-color 0.3s ease;
}

.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.icon {
  font-size: 2rem;
}

.toggle-button {
  background: none;
  border: none;
  color: #d2b48c;
  font-size: 2rem;
  cursor: pointer;
}

.logout-button {
  background: none;
  border: none;
  color: #d2b48c;
  cursor: pointer;
  align-items: center;
}

.logout-button i:hover {
  background: #00476d9d;
  border-radius: 50px;
  opacity: 0.3s ease-in-out;
}
</style>
