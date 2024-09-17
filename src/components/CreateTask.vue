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
      priority: 'Low',
    };
  },
  methods: {
    async createTask() {
      try {
        await axios.post('/api/tasks', {
          title: this.title,
          priority: this.priority,
          completed: false,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.title = '';
        this.priority = 'Low';
        this.$router.push('/tasks'); // Redirect to task list after creation
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
  },
};
</script>
