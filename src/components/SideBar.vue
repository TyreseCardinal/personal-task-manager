<template>
  <div :class="['sidebar', { 'collapsed-sidebar': collapsed }]">
    <div class="sidebar-content">
      <!-- Logo -->
      <img
        src="@/assets/logo.png"
        width="50px"
        height="50px"
        class="logo"
        alt="My logo"
      />

      <!-- Navigation Links -->
      <router-link
        v-for="(route, index) in routes"
        :key="index"
        :to="route.path"
        class="sidebar-link"
        :class="{ active: isActive(route.path) }"
      >
        <i :class="['mdi', route.icon]" class="icon" />
        <span class="sidebar-text" v-if="!collapsed">{{ route.name }}</span>
      </router-link>

      <!-- Collapse Button -->
      <button @click="$emit('toggle')" class="toggle-button">
        <i
          :class="[
            'mdi',
            collapsed ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left',
          ]"
          class="icon"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: Boolean,
  },
  data() {
    return {
      routes: [
        { name: "Home", path: "/", icon: "mdi-home" },
        { name: "Tasks", path: "/tasks", icon: "mdi-format-list-checks" },
        { name: "Projects", path: "/projects", icon: "mdi-folder-outline" },
        {
          name: "Timeline",
          path: "/timeline",
          icon: "mdi-chart-timeline-variant",
        },
        { name: "Calendar", path: "/calendar", icon: "mdi-calendar-month" },
        { name: "Profile", path: "/profile", icon: "mdi-account" },
        { name: "Settings", path: "/settings", icon: "mdi-cog" },
      ],
    };
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
  },
};
</script>

<style scoped>
@import "../styles/scss/sidebar.scss";
</style>
