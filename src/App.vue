<template>
  <div :class="['app-container', { 'sidebar-collapsed': collapsed }]">
    <SideBar v-if="showSidebar" :collapsed="collapsed" @toggle="toggleSidebar" />
    <div :class="['main-content', { 'with-sidebar': showSidebar, 'sidebar-collapsed': collapsed }]">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import auth from '@/services/auth.js';

export default {
  name: 'App',
  async created() {
    try {
      // Call validateToken from auth.js
      const result = await auth.validateToken();
      if (!result.valid) {
        this.logoutAndRedirect();
      }
    } catch (error) {
      console.error('Error validating token:', error.message);
      this.logoutAndRedirect();
    }
  },
  methods: {
    logoutAndRedirect() {
      auth.logout(); // Clear tokens and perform logout
      if (this.$route.path !== '/login') {
        this.$router.push('/login'); // Redirect to login page
      }
    },
    toggleSidebar() {
      this.collapsed = !this.collapsed; // Toggle the sidebar
    },
  },
  data() {
    return {
      collapsed: true, // Sidebar collapsed state
    };
  },
  computed: {
    showSidebar() {
      const hiddenSidebarRoutes = ['/login', '/register', '/404'];
      return !hiddenSidebarRoutes.includes(this.$route.path); // Hide sidebar on specific routes
    },
  },
  components: {
    SideBar, // Sidebar component
  },
};
</script>

<style lang="scss">
@import '@/styles/scss/global.scss';

.app-container {
  display: flex;
  transition: all 0.3s ease;
}

.main-content {
  flex: 1;
  height: 100vh;
  max-width: 100%;
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif;
}

h1 {
  margin: 0;
  padding: 0;
}
</style>
