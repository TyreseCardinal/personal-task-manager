<template>
  <div class="home-view">
    <h1>Welcome to the Task Manager App</h1>
    <p>This is your homepage where you can get an overview of your tasks, projects, and other features.</p>
    <div class="content">
      <p>Here's a quick overview of what you can do:</p>
      <ul>
        <li>Manage your tasks efficiently</li>
        <li>Track your project progress</li>
        <li>Update your profile and settings</li>
      </ul>
      <p>Navigate through the sidebar to explore more!</p>
    </div>
  </div>
</template>

<script>
import auth from '@/services/auth'; // Assuming you have an auth service
import Sidebar from '@/components/Sidebar.vue';


export default {
  components: {
    Sidebar,
  },
  methods: {
    logout() {
      this.$cookies.remove('access_token');
      this.$router.push('/login');
    }
  },
  mounted() {
    if (auth.isAuthenticated()) {
      console.log("User is authenticated");
    }
  }
}
</script>

<style lang="scss" scoped>
.home-view {
  background-color: $primary-color;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-view h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.home-view .content {
  text-align: center;
}

.home-view ul {
  list-style-type: none;
  padding: 0;
}

.home-view li {
  margin: 0.5rem 0;
}
</style>
