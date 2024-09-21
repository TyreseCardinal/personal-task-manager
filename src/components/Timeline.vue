<template>
  <div class="timeline-container">
    <div class="timeline" :style="timelineStyle">
      <!-- Day Ticks -->
      <div class="day-tick" v-for="day in days" :key="day" :class="{ today: day === currentDay }">
        <div class="day-label">{{ day }}</div>
      </div>

      <!-- Event Ticks -->
      <div v-for="event in events" :key="event.id" class="event-tick" @click="expandEvent(event)">
        <!-- Event details (expanded) -->
        <div class="event-details" v-if="event.expanded">
          {{ event.details }}
        </div>
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
    currentDay: String
  },
  data() {
    return {
      days: this.generateDays(),
      translateValue: 0
    };
  },
  computed: {
    timelineStyle() {
      return {
        transform: `translateX(${this.translateValue}px)`,
      };
    },
  },
  methods: {
    generateDays() {
      const today = new Date(this.currentDay);
      const days = [];

      // Generate days for 7 days before and after the current day
      for (let i = -7; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date.toISOString().slice(0, 10)); // Format: YYYY-MM-DD
      }

      return days;
    },
    expandEvent(event) {
      console.log("Expanding event:", event);
      // Logic to expand the event and adjust the timeline
    },
    expandEvent(event) {
      // Toggle the expanded state
      this.events = this.events.map(e => {
        if (e.id === event.id) {
          e.expanded = !e.expanded;
        }
        return e;
      });
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/scss/Timeline.scss';
</style>
