import Vue from 'vue';
import Router from 'vue-router';
import TaskList from '@/components/TaskList.vue';
import CreateTask from '@/components/CreateTask.vue';
import SidebarLink from '@/components/SidebarLink.vue';
import SideBar from '@/components/SideBar.vue';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

Vue.use(Router);

// Helper function to check if the user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem('token'); // Assuming you store the token in localStorage
}

const router = new Router({
  mode: 'history', // Enable history mode
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: '/task',
      name: 'TaskList',
      component: TaskList,
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: '/create',
      name: 'CreateTask',
      component: CreateTask,
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/sidebar',
      name: 'Sidebar',
      component: SideBar,
    },
    {
      path: '/sidebarlink',
      name: 'SidebarLink',
      component: SidebarLink,
    }
  ],
});

// Add a global before guard to check for the authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'Login' }); // Redirect to login if not authenticated
    } else {
      next(); // Proceed to the route
    }
  } else {
    next(); // Always call next() to ensure the app proceeds
  }
});

export default router;
