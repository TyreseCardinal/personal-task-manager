<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>V</div>
        <div>S</div>
      </span>
      <span v-else>Vue Sidebar</span>
    </h1>
    <span class="collapse-icon" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar">
      <SvgIcon :type="'mdi'" :path="path" />
    </span>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiChevronLeft } from '@mdi/js'
import '@/styles/scss/global.scss'
import SidebarLink from './SidebarLink.vue'
import { collapsed, sidebarWidth, toggleSidebar } from './state'

export default {
  components: {
    SvgIcon,
    SidebarLink
  },
  data() {
    return {
      path: mdiChevronLeft,
    }
  },
  computed: {
    collapsed() {
      return collapsed
    },
    sidebarWidth() {
      return sidebarWidth
    }
  },
  methods: {
    toggleSidebar() {
      toggleSidebar()
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  color: #D2B48C;
  background-color: #00334E;

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5rem;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: #D2B48C;

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
