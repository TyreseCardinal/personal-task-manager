<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <h3>
        Not registered? Create an account
        <router-link to="/register">here</router-link>
      </h3>
    </form>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
import auth from '@/services/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        // Use the auth service to handle login
        const response = await auth.login({
          email: this.email,
          password: this.password,
        });

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
