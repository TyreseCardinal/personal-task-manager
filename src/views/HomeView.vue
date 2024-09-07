<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <TaskList />
    <CreateTask />
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';
import CreateTask from '@/components/CreateTask.vue';

export default {
  name: 'HomeView',
  components: {
    TaskList,
    CreateTask
  }
}
</script>

<style scoped>
/* Your SCSS here */
</style>
