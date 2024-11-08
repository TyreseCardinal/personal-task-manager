import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import Cookies from "vue-cookies";
import "@mdi/font/css/materialdesignicons.css"; // Import Material Design icons
import "normalize.css";

Vue.use(Cookies); // Enable VueCookies

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
