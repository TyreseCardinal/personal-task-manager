<template>
  <main class="timeline-view">
    <div class="timeline-header">
      <!-- Buttons, Search, and Month/Year -->
      <button @click="addTask">Add Task</button>
      <button @click="filterTasks">Filter</button>
      <button @click="sortTasks">Sort</button>
      <input type="text" v-model="searchQuery" placeholder="Search tasks" />
      <div class="month-year-display">{{ currentMonth }} {{ currentYear }}
      </div>
    </div>
    <div class="timeline-day-ticks">
      <div class="day-ticks">
        <DayTick v-for="(day, index) in displayedDays" :key="index" :day="day" :isToday="isToday(day)" />
      </div>
    </div>
    <div class="timeline-event-ticks">
      <div class="event-ticks">
        <EventTick v-for="event in filteredEvents" :key="event.id" :event="event" @expand="handleEventExpand" />
      </div>
    </div>
  </main>
</template>

<script>
import DayTick from '@/components/DayTick.vue';
import EventTick from '@/components/EventTick.vue';
import { format, addDays, isToday as isTodayFn } from 'date-fns';
import axios from '@/plugins/axios.js';

export default {
  name: 'TimelineView',
  components: { DayTick, EventTick },
  data() {
    return {
      searchQuery: '',
      currentMonth: format(new Date(), 'MMMM'),
      currentYear: format(new Date(), 'yyyy'),
      displayedDays: this.generateDays(),
      events: [],
      expandedEventId: null,  // Track which event is currently expanded
    };
  },
  computed: {
    filteredEvents() {
      if (this.searchQuery.trim() === '') {
        return this.events;
      }
      return this.events.filter(event =>
        event.title && event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    addTask() {
      console.log('Add task clicked');
    },
    filterTasks() {
      console.log('Filter clicked');
    },
    sortTasks() {
      console.log('Sort clicked');
    },
    generateDays() {
      const today = new Date();
      const days = [];
      for (let i = -7; i <= 7; i++) {
        days.push(format(addDays(today, i), 'dd MMM yyyy'));
      }
      return days;
    },
    isToday(day) {
      return isTodayFn(new Date(day));
    },
    handleEventExpand(event) {
      // Logic to toggle expanded event
      if (this.expandedEventId === event.id) {
        this.expandedEventId = null;  // Collapse if the same event is clicked
      } else {
        this.expandedEventId = event.id;  // Expand the clicked event
      }
    },
    async fetchEvents() {
      try {
        const today = new Date();
        const currentDate = format(today, 'yyyy-MM-dd');
        const access_token = this.$cookies.get('access_token');

        console.log('Current Date:', currentDate);
        console.log('Access Token:', access_token); // Log access token

        const response = await axios.get('/api/timeline', {
          params: {
            current_date: currentDate
          },
          headers: {
            Authorization: `Bearer ${access_token}`
          },
        });

        console.log('API Response:', response.data); // Log API response

        if (response.status === 200) {
          this.events = response.data;
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        // Optional: Log more detailed error info if available
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      }
    },
  },
  created() {
    this.fetchEvents();
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/scss/TimelineView.scss';
@import '@/styles/scss/Timeline.scss';
@import '@/styles/scss/EventTick.scss';
</style>
