<template>
  <div :class="['day-tick', { today: isToday }]">
    {{ day }}
  </div>
</template>

<script>
export default {
  name: 'DayTick',
  props: {
    day: {
      type: String,
      required: true
    },
    isToday: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/scss/DayTick.scss';
</style>
