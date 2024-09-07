import Vue from 'vue';
import Router from 'vue-router';
import TaskList from '@/components/TaskList.vue';
import CreateTask from '@/components/CreateTask.vue';
import HomeView from '@/views/HomeView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // Enable history mode
  routes: [
    {
      path: '/task',
      name: 'TaskList',
      component: TaskList,
    },
    {
      path: '/create',
      name: 'CreateTask',
      component: CreateTask,
    },
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    }
  ],
});
