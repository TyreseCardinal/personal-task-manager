<template>
  <div>
    <h1>Task List</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
    <button @click="fetchTasks">Refresh</button>
  </div>
</template>

<script>
import axios from 'axios'; // Ensure axios is imported

export default {
  data() {
    return {
      tasks: [], // This will hold the list of tasks
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks'); // URL to your Flask API
        this.tasks = response.data; // Update tasks with data from the API
      } catch (error) {
        console.error('Error fetching tasks:', error); // Handle errors
      }
    },
    async deleteTask(taskId) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`); // URL to delete task
        this.fetchTasks(); // Refresh the task list after deletion
      } catch (error) {
        console.error('Error deleting task:', error); // Handle errors
      }
    },
  },
  created() {
    this.fetchTasks(); // Fetch tasks when the component is created
  },
};
</script>


<style scoped>
/* Your SCSS here */
</style>
