<template>
  <main class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <label>
        <input type="checkbox" v-model="rememberMe"> Keep me signed in
      </label>
      <h3>
        Not registered? Create an account
        <router-link to="/register">here</router-link>
      </h3>
    </form>
  </main>
</template>

<script>
import auth from '@/services/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await auth.login({
          email: this.email,
          password: this.password,
        }, this.rememberMe);

        // Once login is successful, redirect
        if (response) {
          setTimeout(() => {
            this.$router.push('/');
          }, 500);
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        if (error.response) {
          alert('Error: ' + (error.response.data.message || 'Invalid credentials'));
        } else {
          alert('Error: Unable to connect to the server');
        }
        console.log(error)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/scss/Login.scss';
</style>
