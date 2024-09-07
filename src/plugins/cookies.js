import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

// Optionally set default cookies options
Vue.$cookies.config('7d') // 7 days expiration
