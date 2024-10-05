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
import tokenService from '@/services/tokenService';

export default {
  async created() {
    try {
      const isValid = await auth.validateAccessToken();
      if (!isValid) {
        this.logoutAndRedirect();
      }
    } catch (error) {
      console.error('Error validating token:', error);
      this.logoutAndRedirect();
    }
  },
  methods: {
    logoutAndRedirect() {
      auth.logout();
      if (this.$route.path !== '/login') {
        this.$router.push('/login');
      }
    },
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
  },
  data() {
    return {
      collapsed: true,
    };
  },
  computed: {
    showSidebar() {
      const hiddenSidebarRoutes = ['/login', '/register', '/404'];
      return !hiddenSidebarRoutes.includes(this.$route.path);
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
  max-width: 100%;
  width: 90%;
  overflow-x: hidden;
  font-family: 'Poppins' sans-serif;
}
</style>
