<template>
  <div class="calendar-container">
    <div class="calendar-grid">
      <!-- Render the calendar days -->
      <div v-for="day in days" :key="day.date" class="calendar-day">
        <span class="day-number">{{ day.number }}</span>
        <div class="events">
          <!-- Display events for that day -->
          <div v-for="event in day.events" :key="event.id" class="event-item">
            <p>{{ event.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    events: Array,
    currentDay: String,
  },
  computed: {
    days() {
      // Generate days for the current month (simplified version)
      const days = [];
      const today = new Date(this.currentDay);
      const currentMonth = today.getMonth();
      const firstDay = new Date(today.getFullYear(), currentMonth, 1);
      const lastDay = new Date(today.getFullYear(), currentMonth + 1, 0);

      // Loop through the days of the month
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayDate = new Date(today.getFullYear(), currentMonth, day).toISOString().slice(0, 10);
        days.push({
          date: dayDate,
          number: day,
          events: this.events.filter(event => event.event_date === dayDate),
        });
      }

      return days;
    },
  },
};
</script>

<style scoped>
.calendar-container {
  display: flex;
  flex-wrap: wrap;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* 7 columns for the 7 days of the week */
}

.calendar-day {
  padding: 1rem;
  border: 1px solid lightgray;
  text-align: center;
}

.event-item {
  background-color: lightblue;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
</style>
