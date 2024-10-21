<template>
  <div>
    <h1>Task Manager</h1>

    <!-- Add Task Form -->
    <form @submit.prevent="addTask">
      <input v-model="newTask.title" placeholder="Task Title" required />
      <input v-model="newTask.description" placeholder="Task Description" />
      <select v-model="newTask.status">
        <option value="bin">Bin</option>
        <option value="to-do">To-Do</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>

    <!-- Bin and Kanban Board -->
    <div class="kanban">
      <div class="column">
        <h2>Bin</h2>
        <div v-for="task in binTasks" :key="task.id">
          <p>{{ task.title }}</p>
          <button @click="deleteTask(task.id)">Delete</button>
          <button @click="editTask(task)">Edit</button>
        </div>
      </div>

      <div class="column">
        <h2>To-Do</h2>
        <div v-for="task in toDoTasks" :key="task.id">
          <p>{{ task.title }}</p>
          <button @click="deleteTask(task.id)">Delete</button>
          <button @click="editTask(task)">Edit</button>
        </div>
      </div>

      <div class="column">
        <h2>In-Progress</h2>
        <div v-for="task in inProgressTasks" :key="task.id">
          <p>{{ task.title }}</p>
          <button @click="deleteTask(task.id)">Delete</button>
          <button @click="editTask(task)">Edit</button>
        </div>
      </div>

      <div class="column">
        <h2>Completed</h2>
        <div v-for="task in completedTasks" :key="task.id">
          <p>{{ task.title }}</p>
          <button @click="deleteTask(task.id)">Delete</button>
          <button @click="editTask(task)">Edit</button>
        </div>
      </div>
    </div>

    <!-- Multi-Select Delete -->
    <button @click="deleteMultipleTasks">Delete All Selected</button>
  </div>
</template>

<script>
import TaskService from '@/services/task';

export default {
  data() {
    return {
      tasks: [],
      newTask: {
        title: '',
        description: '',
        status: 'bin',
      },
    };
  },
  computed: {
    binTasks() {
      return this.tasks.filter(task => task.status === 'bin');
    },
    toDoTasks() {
      return this.tasks.filter(task => task.status === 'to-do');
    },
    inProgressTasks() {
      return this.tasks.filter(task => task.status === 'in-progress');
    },
    completedTasks() {
      return this.tasks.filter(task => task.status === 'completed');
    },
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      TaskService.getTasks()
        .then(response => {
          this.tasks = response.data;
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    },
    addTask() {
      TaskService.createTask(this.newTask)
        .then(response => {
          this.tasks.push(response.data);
          this.newTask = { title: '', description: '', status: 'bin' }; // Reset form
        })
        .catch(error => {
          console.error('Error adding task:', error);
        });
    },
    deleteTask(taskId) {
      TaskService.deleteTask(taskId)
        .then(() => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        })
        .catch(error => {
          console.error('Error deleting task:', error);
        });
    },
    editTask(task) {
      const updatedTask = { ...task, title: prompt('Edit Title', task.title) };
      TaskService.updateTask(task.id, updatedTask)
        .then(() => {
          const taskIndex = this.tasks.findIndex(t => t.id === task.id);
          if (taskIndex > -1) {
            this.$set(this.tasks, taskIndex, updatedTask);
          }
        })
        .catch(error => {
          console.error('Error updating task:', error);
        });
    },
    deleteMultipleTasks() {
      const taskIds = this.tasks.map(task => task.id);
      TaskService.deleteMultipleTasks(taskIds)
        .then(() => {
          this.tasks = [];
        })
        .catch(error => {
          console.error('Error deleting multiple tasks:', error);
        });
    }
  },
};
</script>

<style scoped>
.kanban {
  display: flex;
}

.column {
  flex: 1;
  margin: 0 10px;
  background: #f0f0f0;
  padding: 10px;
}
</style>
