import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';
import Register from '@/views/Register.vue';
import TimelineView from '@/views/TimelineView.vue';

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
      path: '/timeline',
      name: 'TimelineView',
      component: TimelineView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
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


// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = Vue.$cookies.get('access_token'); // Checking if the auth token cookie exists

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' }); // Redirect to login page if not authenticated
    } else {
      next(); // Proceed to the route if authenticated
    }
  } else {
    next(); // If route does not require authentication, proceed
  };
  if (to.name === 'Login' && isAuthenticated) {
    // If the user is logged in and tries to access the login page, redirect to home/dashboard
    next({ name: 'Home' }); // Redirect to dashboard or home page if already authenticated
  } else {
    next(); // Otherwise, proceed to the next route
  }
});


export default router;
