<template>
  <main class="timeline-calendar-page">
    <TimelineCalendar />
  </main>
</template>

<script>
import TimelineCalendar from '@/components/TimelineCalendar.vue';

export default {
  name: 'TimelineCalendarView',
  components: {
    TimelineCalendar,
  },
};
</script>
