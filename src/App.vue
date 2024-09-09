<template>
  <main>
    <SideBar />
    <div :style="{ 'margin-let': sidebarWidth }">
      <router-view />
    </div>
  </main>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import { sidebarWidth } from './components/state';

export default {
  components: { SideBar },
  setup() {
    return { sidebarWidth }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
