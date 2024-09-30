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
  data() {
    return {
      collapsed: true, // Sidebar initially collapsed
    };
  },
  computed: {
    showSidebar() {
      const hiddenSidebarRoutes = ['/login', '/register', '/404'];
      return !hiddenSidebarRoutes.includes(this.$route.path); // Hide sidebar on specific routes
    },
  },
  components: {
    SideBar,
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
  transition: margin-left 0.3s ease;
  height: 100vh;
}

.with-sidebar {
  margin-left: 150px;
}

.sidebar-collapsed .with-sidebar {
  margin-left: 50px;
}
</style>
