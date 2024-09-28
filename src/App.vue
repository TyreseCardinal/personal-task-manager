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
import { jwtDecode } from 'jwt-decode'; // Ensure this import is correct

export default {
  async created() {
    try {
      const isValid = await auth.validateAccessToken(); // Validate the token
      if (!isValid) {
        this.logoutAndRedirect(); // Call logout and redirect if token is invalid
      }
    } catch (error) {
      console.error('Error validating token:', error);
      this.logoutAndRedirect(); // Call if there's an error
    }
  },
  methods: {
    logoutAndRedirect() {
      auth.logout(); // Clear cookies
      // Check if the current route is not the login route
      if (this.$route.path !== '/login') {
        this.$router.push('/login'); // Redirect to login page
      }
    },
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
  },
  components: {
    SideBar,
  },
  data() {
    return {
      collapsed: true,
    };
  },
  computed: {
    showSidebar() {
      const hiddenSidebarRoutes = ['/login', '/signup', '/404'];
      return !hiddenSidebarRoutes.includes(this.$route.path);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/scss/variables';

.app-container {
  display: flex;
  transition: all 0.3s ease;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease;
}

.with-sidebar {
  margin-left: 150px;
}

.sidebar-collapsed .with-sidebar {
  margin-left: 50px;
}
</style>
