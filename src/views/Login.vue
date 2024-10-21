<template>
  <main class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input id="login-email" v-model="email" type="email" placeholder="Email" autocomplete="email">
      <input id="login-password" v-model="password" type="password" placeholder="Password"
        autocomplete="current-password">
      <button type="submit">Login</button>
      <label>
        <input id="login-checkbox" type="checkbox" v-model="rememberMe"> Keep me signed in
      </label>
      <h3>
        Not registered? Create an account
        <router-link to="/register">here</router-link>
      </h3>
    </form>
  </main>
</template>

<script>
import auth from '@/services/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false, // RememberMe is still here to send to backend
    };
  },
  methods: {
    async login() {
      try {
        const response = await auth.login({
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        });

        if (response === 200) {
          this.$router.push('/home');
        } else {

        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/scss/Login.scss';
</style>
