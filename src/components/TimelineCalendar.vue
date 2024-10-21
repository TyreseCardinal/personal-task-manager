<template>
  <div class="timeline-calendar-container">
    <header class="timeline-calendar-header">
      <!-- Buttons to switch between views -->
      <button @click="toggleView">Switch to {{ isCalendarView ? 'Timeline' : 'Calendar' }}</button>

      <!-- Search Input -->
      <input v-model="searchQuery" type="text" placeholder="Search events" />
    </header>

    <!-- Render either Timeline or Calendar based on view state -->
    <div v-if="isCalendarView">
      <Calendar :events="events" :currentDay="currentDay" />
    </div>
    <div v-else>
      <Timeline :events="events" :currentDay="currentDay" />
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import axios from '@/plugins/axios.js';
import Calendar from '@/components/Calendar.vue';
import Timeline from '@/components/Timeline.vue';

export default {
  name: 'TimelineCalendar',
  components: {
    Calendar,
    Timeline,
  },
  data() {
    return {
      isCalendarView: false,  // Boolean to toggle between calendar and timeline views
      searchQuery: '',
      currentDay: format(new Date(), 'yyyy-MM-dd'),
      events: [],
    };
  },
  methods: {
    toggleView() {
      this.isCalendarView = !this.isCalendarView;
    },
    async fetchEvents() {
      try {
        const response = await axios.get('/api/events'); // Modify if necessary to match your API endpoint
        if (response.status === 200) {
          this.events = response.data;
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
  },
  created() {
    this.fetchEvents(); // Fetch events on component creation
  },
};
</script>

<style scoped>
.timeline-calendar-container {
  padding: 1rem;
}

.timeline-calendar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
</style>
