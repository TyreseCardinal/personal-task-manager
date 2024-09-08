<template>
  <div>
    <h1>Create Task</h1>
    <form @submit.prevent="createTask">
      <input v-model="title" placeholder="Task title" required />
      <select v-model="priority" required>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      priority: 'Low',  // Default priority
    };
  },
  methods: {
    async createTask() {
      try {
        await axios.post('http://localhost:5000/api/tasks', {
          title: this.title,
          priority: this.priority,  // Send priority to the backend
          completed: false
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
