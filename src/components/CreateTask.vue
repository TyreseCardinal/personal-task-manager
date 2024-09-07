<template>
  <div>
    <h1>Create Task</h1>
    <form @submit.prevent="createTask">
      <input v-model="title" placeholder="Task title" required />
      <label>
        <input type="checkbox" v-model="completed" />
        Completed
      </label>
      <button type="submit">Create Task</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'; // Make sure to import axios

export default {
  data() {
    return {
      title: '',
      completed: false, // Initialize completed property
    };
  },
  methods: {
    async createTask() {
      try {
        // Make POST request to create a new task
        const response = await axios.post('http://localhost:5000/api/tasks', {
          title: this.title,
          completed: this.completed, // Send the completed status
        });

        // Optionally handle the response
        console.log('Task created:', response.data);

        // Redirect to the task list page
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Your SCSS here */
</style>
