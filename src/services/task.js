// services/task.js
import axios from '@/plugins/axios'; // Import the axios instance with JWT handling

export default {
  async fetchTasks() {
    try {
      const response = await axios.get('/tasks');
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  async addTask(taskData) {
    try {
      const response = await axios.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  async updateTask(taskId, updatedTaskData) {
    try {
      const response = await axios.put(`/tasks/${taskId}`, updatedTaskData);
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  async deleteTask(taskId) {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};
