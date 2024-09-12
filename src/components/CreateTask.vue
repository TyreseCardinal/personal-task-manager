// src/components/CreateTask.vue
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
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      title: '',
      priority: 'Low',
    };
  },
  methods: {
    ...mapActions(['createTask']),
    async createTask() {
      await this.createTask({
        title: this.title,
        priority: this.priority,
        completed: false,
      });
    },
  },
};
</script>
