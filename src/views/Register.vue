<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      registrationSuccessful: false, // Added flag
    };
  },
  computed: {
    ...mapGetters(['message']),
  },
  watch: {
    registrationSuccessful(newValue) {
      if (newValue) {
        this.$router.push('/login');
      }
    },
  },
  methods: {
    ...mapActions(['register']),
    async register() {
      try {
        await this.register({
          username: this.username,
          email: this.email,
          password: this.password,
        });
        // Navigate to login or home page upon successful registration
        this.$router.push('/').catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            console.error('Navigation error:', err);
          }
        });
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  },
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

.form-group {
  margin-bottom: 15px;
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
