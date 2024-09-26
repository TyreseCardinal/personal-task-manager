import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import VueCookies from 'vue-cookies';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(VueCookies);
Vue.$cookies.config('7d'); // Set default cookie options, 7 days expiration

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
