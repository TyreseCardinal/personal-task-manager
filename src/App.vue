<template>
  <div class="app-container">
    <SideBar :collapsed="collapsed" @toggle="toggleSidebar" />
    <div :class="['main-content', mainContentClass]">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  data() {
    return {
      collapsed: true,
    };
  },
  computed: {
    mainContentClass() {
      return this.collapsed ? "collapsed" : "expanded";
    },
  },
  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
  },
  components: {
    SideBar,
  },
};
</script>

<style lang="scss">
@import "@/styles/scss/global.scss";

.app-container {
  display: flex;
  height: 100vh;
  background-color: $lightblue-color;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  transition: margin-left 0.3s;
}

.expanded {
  margin-left: 150px;
}
</style>
