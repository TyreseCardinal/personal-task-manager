<template>
  <div class="timeline-container" :style="{ width: timelineWidth }">
    <div class="timeline">
      <!-- Day Ticks -->
      <div v-for="day in days" :key="day" class="day-tick">
        <div :class="['day-tick', { today: day === currentDay }]" @click="goToDay(day)">
          <div class="day-label">{{ dayNumber(day) }}</div> <!-- Updated to show day and date -->
        </div>
      </div>

      <!-- Event Ticks -->
      <div v-for="event in events" :key="event.id" @click="expandEvent(event)"
        :style="{ left: calculateEventPosition(event), top: '50px' }">
        <div :class="['event-tick', { expanded: isExpanded(event.id) }]">
          <h3>{{ event.title }}</h3>
          <p>{{ event.event_date }}</p>
          <div v-if="isExpanded(event.id)" class="event-details">
            <p>{{ event.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    events: Array,
    currentDay: String,
    expandedEventId: String, // Accept the expanded event ID from TimelineView
  },
  data() {
    return {
      days: this.generateDays(),
    };
  },
  methods: {
    goToDay(day) {
      this.$emit('day-clicked', day);
    },
    expandEvent(event) {
      this.$emit('expand', event); // Emit the event for expansion handling in TimelineView
    },
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
    calculateEventPosition(event) {
      const eventDate = new Date(event.event_date);
      const currentDate = new Date(this.currentDay);
      const offsetDays = Math.floor((eventDate - currentDate) / (1000 * 60 * 60 * 24));
      const dayWidth = 40; // Width of each day tick
      return `${(offsetDays * dayWidth) + 50}px`; // Calculate left position
    },
    dayNumber(day) {
      const date = new Date(day);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }); // Example: "Mon"
      const dayOfMonth = date.getDate(); // Example: 25
      return `${dayOfWeek} ${dayOfMonth}`; // Example: "Mon 25"
    },
    isExpanded(eventId) {
      return eventId === this.expandedEventId; // Determine if the event is expanded based on the prop
    },
  },
  computed: {
    timelineWidth() {
      const totalWidth = window.innerWidth;
      return `${totalWidth - 50}px`;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/scss/Timeline.scss';
</style>
