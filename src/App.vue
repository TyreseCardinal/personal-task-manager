<template>
  <div id="app">
    <Sidebar v-if="!isLoginPage" :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />
    <div :class="['main-content', { 'content-expanded': !sidebarCollapsed && !isLoginPage }]">
      <router-view />
    </div>
  </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      sidebarCollapsed: true
    };
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/login';
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }
};
</script>

<style>
#app {
  display: flex;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.main-content {
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}
</style>
