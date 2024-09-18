<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
      <h3>Already have an account? Login
        <router-link to="/login">here</router-link>
      </h3>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        this.message = response.data.message;
        this.$router.push('/login');
      } catch (error) {
        this.message = error.response.data.message || 'Registration failed.';
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 600px;
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

input {
  margin: 1rem;
  width: 200px;
  height: 25px;
}
</style>
