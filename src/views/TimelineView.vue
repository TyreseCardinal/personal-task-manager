<template>
  <div class="timeline-view">
    <Timeline :events="events" :currentDay="currentDay" />
  </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue';
import auth from '@/services/auth.js';
import axios from '@/plugins/axios';

export default {
  name: 'TimelineView',
  components: {
    Timeline,
  },
  data() {
    return {
      currentDay: new Date().toISOString().slice(0, 10), // Today's date in YYYY-MM-DD format
      events: [], // This will be fetched from the API
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      // Call API to get events for the timeline
      this.$axios.get(`/api/timeline?current_date=${this.currentDay}`)
        .then(response => {
          this.events = response.data;
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    },
    mounted() {
      if (auth.isAuthenticated()) {
        console.log("User is authenticated");
      }
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/scss/TimelineView.scss';
</style>
