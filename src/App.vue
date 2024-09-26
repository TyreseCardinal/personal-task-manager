<template>
  <div :class="['app-container', { 'sidebar-collapsed': collapsed }]">
    <!-- Sidebar should only be visible when 'showSidebar' is true -->
    <Sidebar v-if="showSidebar" :collapsed="collapsed" @toggle="toggleSidebar" />

    <!-- Main content area with dynamic margin -->
    <div :class="['main-content', { 'with-sidebar': showSidebar, 'sidebar-collapsed': collapsed }]">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Sidebar,
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
  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/scss/variables';

/* Keep your original sidebar and main content styling, with minor adjustments */
.app-container {
  display: flex;
  transition: all 0.3s ease;
}

/* Main content takes up remaining space and adjusts based on the sidebar state */
.main-content {
  flex: 1;
  transition: margin-left 0.3s ease;
}

/* Adjust margin when the sidebar is visible and not collapsed */
.with-sidebar {
  margin-left: 150px;
  /* Match the expanded sidebar width */
}

/* Adjust margin when the sidebar is collapsed */
.sidebar-collapsed .with-sidebar {
  margin-left: 50px;
  /* Match the collapsed sidebar width */
}
</style>
