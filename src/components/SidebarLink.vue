<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <svgIconVue class="icon" :class="icon" />
    <transition name="fade">
      <span v-if="!collapsed">
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<script>
import svgIconVue from '@jamescoyle/vue-icon';
import '@/styles/scss/global.scss';
import { mapState } from 'vuex'; // Use mapState to access Vuex state

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
  },
  computed: {
    ...mapState(['collapsed']), // Use mapState to access the 'collapsed' state

    isActive() {
      return this.$route.path === this.to; // Access the route with this.$route in Vue 2
    },
  },
  components: {
    svgIconVue,
  },
};
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;

  color: #00334E;
  text-decoration: none;
}

.link:hover {
  background-color: #E8E8E8;
}

.link:active {
  background-color: #00334E;
}

.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>
