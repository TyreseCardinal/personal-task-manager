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
        const response = await axios.get('/api/tasks', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async deleteTask(taskId) {
      try {
        await axios.delete(`/api/tasks/${taskId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.fetchTasks(); // Refresh task list after deletion
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>
