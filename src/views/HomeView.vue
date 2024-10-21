<template>
  <main class="home-view">
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
  </main>
</template>

<script>
import SideBar from '@/components/SideBar.vue';


export default {
  components: {
    SideBar,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/scss/homeview.scss';
</style>
