import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';
import Register from '@/views/Register.vue';

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
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { hideSidebar: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

import VueCookies from 'vue-cookies';

router.beforeEach((to, from, next) => {
  const token = VueCookies.get('access_token'); // Update to match token key

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login'); // Redirect to login if not authenticated
    } else {
      next(); // Proceed if authenticated
    }
  } else {
    next(); // Always allow access to routes without `requiresAuth`
  }
});


export default router;
