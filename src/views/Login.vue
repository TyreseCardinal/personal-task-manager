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
        const response = await axios.post('/auth/login', {
          email: this.email,
          password: this.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          console.log('Login Successful');
          this.$cookies.set('access_token', response.data.token); // Correctly set token in cookies
          this.$router.push('/'); // Redirect to home
        }
      } catch (error) {
        alert('Invalid credentials');
        console.log(error);
      }
      if (auth.isAuthenticated()) {
        console.log("User is authenticated");
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #00334E;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #005b8f;
}

p {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
