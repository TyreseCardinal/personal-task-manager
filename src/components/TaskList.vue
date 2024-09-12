// src/components/TaskList.vue
<template>
  <div>
    <h1>Task List</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }} - Priority: {{ task.priority }}
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
    <button @click="fetchTasks">Refresh</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['tasks']),
  },
  methods: {
    ...mapActions(['fetchTasks', 'deleteTask']),
  },
  created() {
    this.fetchTasks();
  },
};
</script>