<template>
  <div id="app">
    <!-- Conditionally render Sidebar if hideSidebar meta is not true -->
    <Sidebar v-if="!hideSidebar" :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <!-- Main content area adapts based on sidebar visibility -->
    <div :class="['main-content', { 'content-expanded': !sidebarCollapsed && !hideSidebar }]">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import '@/styles/scss/global.scss';

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
    // Check if the route's meta field specifies hiding the sidebar
    hideSidebar() {
      return this.$route.meta.hideSidebar;
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

.content-expanded {
  margin-left: 250px;
  /* Adjust this depending on the size of your sidebar */
}

* {
  box-sizing: border-box;
}
</style>
