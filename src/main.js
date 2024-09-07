import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import '@/styles/global.scss'


Vue.use(VueCookies);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
