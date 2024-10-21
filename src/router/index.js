import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';
import Register from '@/views/Register.vue';
import TimelineCalendarView from '@/views/TimelineCalendarView.vue';  // Updated import to use new page
import TaskList from '@/components/TaskList.vue';
import ToDoList from '@/views/ToDoList.vue';
import axios from '@/plugins/axios';  // Import your axios instance

Vue.use(Router);

const router = new Router({
  mode: 'history', // Use 'history' mode for cleaner URLs (optional)
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { hideSidebar: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { hideSidebar: true }
    },
    {
      path: '/timeline-calendar',
      name: 'TimelineCalendarView',
      component: TimelineCalendarView,
      meta: { requiresAuth: true }
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: TimelineCalendarView,
      meta: { requiresAuth: true }
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: ToDoList,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/' // Redirect any unknown routes to home
    }
  ]
});


export default router;
