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
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = axios.get('http://localhost:5000/api/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask(taskId) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        this.fetchTasks();
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    this.fetchTasks();
  }
};
</script>
