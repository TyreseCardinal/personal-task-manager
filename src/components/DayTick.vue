<template>
  <div :class="['day-tick', { today: isToday }]" @click="goToDay">
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
  },
  methods: {
    goToDay() {
      // Emit an event or change state when the day is clicked
      this.$emit('day-clicked', this.day);
    }
  }
};
</script>
