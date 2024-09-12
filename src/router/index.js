import Vue from 'vue';
import Router from 'vue-router';
import store from '@/plugins/store';
import TaskList from '@/components/TaskList.vue';
import CreateTask from '@/components/CreateTask.vue';
import SidebarLink from '@/components/SidebarLink.vue';
import SideBar from '@/components/SideBar.vue';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/Profile.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'HomeView', component: HomeView, meta: { requiresAuth: true } },
    { path: '/task', name: 'TaskList', component: TaskList, meta: { requiresAuth: true } },
    { path: '/create', name: 'CreateTask', component: CreateTask, meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/sidebar', name: 'Sidebar', component: SideBar },
    { path: '/sidebarlink', name: 'SidebarLink', component: SidebarLink },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(`Navigating to ${to.path}`);

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log('Requires Auth:', store.getters.isAuthenticated);

    if (!store.getters.isAuthenticated) {
      console.log('Redirecting to Login');
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
