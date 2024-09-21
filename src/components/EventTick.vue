<template>
  <div class="event-tick" :style="{ left: eventPosition }" @click="expand">
    <div class="tooltip">
      {{ event.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventTick',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    eventPosition() {
      // This could be a dynamic calculation based on event date, time, etc.
      // For simplicity, I'm using event.position as a placeholder.
      return this.event.position + 'px';
    }
  },
  methods: {
    expand() {
      this.$emit('expand', this.event);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/scss/EventTick.scss';
</style>
