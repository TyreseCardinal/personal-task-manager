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
import axios from '@/plugins/axios';

export default {
  data() {
    return {
      updateEmail: '',
      updatePassword: '',
      message: '',
      uploadMessage: ''
    };
  },
  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        try {
          await axios.options('/upload', formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data'
            },
          });
          this.uploadMessage = 'Profile picture uploaded successfully!';
        } catch (error) {
          this.uploadMessage = 'Failed to upload profile picture.';
        }
      }
    },
    async updateUser() {
      try {
        await axios.put('/users/update', {
          email: this.updateEmail,
          password: this.updatePassword,
        });
        this.message = 'User information updated successfully!';
      } catch (error) {
        this.message = 'Update failed.';
      }
    },
    async deleteAccount() {
      try {
        await axios.delete('/users/delete');
        this.message = 'Account deleted successfully.';
        this.$router.push('/login');
      } catch (error) {
        this.message = 'Account deletion failed.';
      }
    }
  }
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
