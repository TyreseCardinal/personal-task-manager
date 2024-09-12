import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Ensure the path is correct
import store from '@/plugins/store';
import VueCookies from 'vue-cookies';
import SvgIcon from '@jamescoyle/vue-icon';
import axios from '@/plugins/axios';

Vue.use(VueCookies);
Vue.component('SvgIcon', SvgIcon);

Vue.config.productionTip = false;

new Vue({
  router, // Make sure router is included
  store,
  render: (h) => h(App),
}).$mount('#app');
