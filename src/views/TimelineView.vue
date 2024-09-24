<template>
  <div class="timeline-view">
    <div class="timeline-header">
      <!-- Buttons -->
      <button @click="addTask">Add Task</button>
      <button @click="filterTasks">Filter</button>
      <button @click="sortTasks">Sort</button>
      <input type="text" v-model="searchQuery" placeholder="Search tasks" />

      <!-- Month/Year Display -->
      <div class="month-year-display">{{ currentMonth }} {{ currentYear }}</div>
    </div>

    <div class="timeline-content">
      <div class="day-ticks">
        <DayTick v-for="(day, index) in displayedDays" :key="index" :day="day" :isToday="isToday(day)" />
      </div>

      <div class="event-ticks">
        <EventTick v-for="event in filteredEvents" :key="event.id" :event="event" @expand="handleEventExpand" />
      </div>
    </div>
  </div>
</template>

<script>
import DayTick from '@/components/DayTick.vue';
import EventTick from '@/components/EventTick.vue';
import { format, addDays, subDays, isToday as isTodayFn } from 'date-fns';
import auth from '@/services/auth.js';
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
      events: [], // Fetched events will be stored here
    };
  },
  computed: {
    filteredEvents() {
      if (this.searchQuery.trim() === '') {
        return this.events;
      }
      return this.events.filter(event =>
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    addTask() {
      // Logic to add a task
      console.log('Add task clicked');
    },
    filterTasks() {
      // Filter logic
      console.log('Filter clicked');
    },
    sortTasks() {
      // Sorting logic
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
      // Logic for expanding the event details
      console.log('Event expanded:', event);
    },
    async fetchEvents() {
      try {
        const today = new Date();
        const currentDate = format(today, 'yyyy-MM-dd');

        const response = await axios.get('/api/timeline', {
          params: {
            current_date: currentDate // Use currentDate instead of this.currentDate
          }
        });

        if (response.status === 200) {
          this.events = response.data.events;
          console.log('Events fetched successfully:', this.events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

  },
  mounted() {
    if (auth.isAuthenticated()) {
      console.log('User is authenticated');
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/scss/TimelineView.scss';
</style>
