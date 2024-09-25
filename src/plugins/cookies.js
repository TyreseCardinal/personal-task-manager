import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

// Set default cookie configuration
Vue.$cookies.config('1d', '/', 'localhost', false, 'Lax'); // 1 day expiration, path '/', domain 'localhost', not secure, SameSite 'Lax'
