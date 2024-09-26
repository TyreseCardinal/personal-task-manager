<template>
  <div :class="['event-tick', { expanded: isExpanded }]" @click="expandEvent">
    <h3>{{ event.title }}</h3>
    <p>{{ event.event_date }}</p>
    <div v-if="isExpanded" class="event-details">
      <p>{{ event.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
    isExpanded: Boolean,
  },
  methods: {
    expandEvent() {
      this.$emit('expand', this.event);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/scss/EventTick.scss';
</style>
