<template>
  <div class="profile-container">
    <!-- Profile Picture Upload Section -->
    <div class="profile-picture-upload">
      <h2>Upload Profile Picture</h2>
      <input type="file" @change="handleFileUpload" />
      <p v-if="uploadMessage">{{ uploadMessage }}</p>
    </div>

    <!-- Update User Information Section -->
    <div class="update-user-info">
      <h2>Update Information</h2>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="update-email">New Email:</label>
          <input v-model="updateEmail" type="email" id="update-email" />
        </div>
        <div class="form-group">
          <label for="update-password">New Password:</label>
          <input v-model="updatePassword" type="password" id="update-password" />
        </div>
        <button type="submit">Update</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>

    <!-- Delete Account Section -->
    <div class="delete-account">
      <h2>Delete Account</h2>
      <button @click="deleteAccount">Delete My Account</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      updateEmail: '',
      updatePassword: '',
    };
  },
  computed: {
    ...mapGetters(['message', 'uploadMessage']),
  },
  methods: {
    ...mapActions([
      'uploadProfilePicture',
      'updateUser',
      'deleteAccount'
    ]),
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadProfilePicture(file);
      }
    },
    async updateUser() {
      try {
        await this.updateUser({
          email: this.updateEmail,
          password: this.updatePassword
        });
      } catch (error) {
        console.error("Update error:", error);
        this.message = 'Update failed.';
      }
    },
    async deleteAccount() {
      try {
        await this.deleteAccount();
      } catch (error) {
        console.error("Delete error:", error);
        this.message = 'Account deletion failed.';
      }
    }
  },
};
</script>

<style scoped>
.profile-container {
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
