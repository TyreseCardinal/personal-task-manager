<template>
  <div class="timeline-container" :style="{ width: timelineWidth }">
    <div class="timeline">
      <!-- Day Ticks -->
      <div class="day-tick" v-for="day in days" :key="day" :class="{ today: day === currentDay }">
        <DayTick :day="day" :isToday="day === currentDay" />
      </div>

      <!-- Event Ticks -->
      <div class="event-tick" v-for="event in events" :key="event.id" @click="expandEvent(event)"
        :style="{ left: calculateEventPosition(event), top: '50px' }">
        <EventTick :event="event" :isExpanded="event.expanded" />
      </div>
    </div>
  </div>
</template>


<script>
import DayTick from '@/components/DayTick.vue';
import EventTick from '@/components/EventTick.vue';

export default {
  components: {
    DayTick,
    EventTick,
  },
  props: {
    events: Array,
    currentDay: String,
  },
  data() {
    return {
      days: this.generateDays(),
    };
  },
  methods: {
    generateDays() {
      const today = new Date(this.currentDay);
      const days = [];
      for (let i = -7; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date.toISOString().slice(0, 10)); // Format: YYYY-MM-DD
      }
      return days;
    },
    expandEvent(event) {
      event.expanded = !event.expanded; // Toggle expanded state
    },
    calculateEventPosition(event) {
      const eventDate = new Date(event.event_date);
      const currentDate = new Date(this.currentDay);
      const offsetDays = Math.floor((eventDate - currentDate) / (1000 * 60 * 60 * 24));
      const dayWidth = 40; // Width of each day tick
      return `${(offsetDays * dayWidth) + 50}px`; // Calculate left position
    },
  },
  data() {
    return {
      days: this.generateDays(),
      sidebarWidth: 50, // Default closed width
      isSidebarOpen: false
    };
  },
  computed: {
    timelineWidth() {
      // Adjust the timeline's width based on the sidebar
      const totalWidth = window.innerWidth; // Get the total viewport width
      const adjustedWidth = this.isSidebarOpen ? totalWidth - 200 : totalWidth - this.sidebarWidth; // Adjust based on sidebar width
      return `${adjustedWidth}px`;
    }
  }

};
</script>

<style scoped lang="scss">
@import '@/styles/scss/Timeline.scss';
</style>
