import Vue from 'vue';
import App from './App.vue';
import router from './router/index'; // Ensure the path is correct
import VueCookies from 'vue-cookies';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(VueCookies);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
