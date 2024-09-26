<template>
  <div :class="['day-tick', { today: isToday }]" @click="goToDay">
    <div class="day-label">{{ day }}</div>
  </div>
</template>

<script>
export default {
  name: 'DayTick',
  props: {
    day: {
      type: String,
      required: true,
    },
    isToday: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goToDay() {
      this.$emit('day-clicked', this.day);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/scss/DayTick.scss'
</style>
