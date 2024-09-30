<template>
  <main class="timeline-view">
    <header class="timeline-header">
      <!-- Buttons, Search, and Month/Year -->
      <button @click="addTask">Add Task</button>
      <button @click="filterTasks">Filter</button>
      <button @click="sortTasks">Sort</button>
      <input id="timeline-search" type="text" v-model="searchQuery" placeholder="Search tasks" />
      <div class="month-year-display">{{ currentMonth }} {{ currentYear }}</div>
    </header>

    <Timeline :events="filteredEvents" :currentDay="currentDay" :expandedEventId="expandedEventId"
      @expand="handleEventExpand" />
  </main>
</template>

<script>
import { format } from 'date-fns';
import axios from '@/plugins/axios.js';
import Timeline from '@/components/Timeline.vue';
import auth from '@/services/auth.js';

export default {
  name: 'TimelineView',
  components: {
    Timeline,
  },
  data() {
    return {
      searchQuery: '',
      currentMonth: format(new Date(), 'MMMM'),
      currentYear: format(new Date(), 'yyyy'),
      currentDay: format(new Date(), 'yyyy-MM-dd'),
      events: [],
      expandedEventId: null, // Track which event is currently expanded
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
      // Logic for adding a task goes here
    },
    filterTasks() {
      console.log('Filter clicked');
      // Logic for filtering tasks goes here
    },
    sortTasks() {
      console.log('Sort clicked');
      // Logic for sorting tasks goes here
    },
    handleEventExpand(event) {
      // Toggle the expanded state of the clicked event
      this.expandedEventId = this.expandedEventId === event.id ? null : event.id;
    },
    async fetchEvents() {
      try {
        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const access_token = this.$cookies.get('access_token');

        const response = await axios.get('/api/timeline', {
          params: { current_date: currentDate },
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (response.status === 200) {
          this.events = response.data;
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
  },
  created() {
    this.fetchEvents(); // Fetch events on creation
  },
  mounted() {
    if (auth.isAuthenticated()) {
      console.log('User is authenticated');
    }
  },
};
</script>

<style lang="scss">
@import '@/styles/scss/Timeline.scss';
</style>
