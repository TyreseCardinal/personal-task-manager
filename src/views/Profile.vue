<template>
  <main class="profile-container">
    <!-- File upload handled by ProfilePicture component -->
    <ProfilePicture />

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
  </main>
</template>

<script>
import axios from '@/plugins/axios';
import ProfilePicture from '@/components/ProfilePicture.vue';

export default {
  components: {
    ProfilePicture,
  },
  data() {
    return {
      updateEmail: '',
      updatePassword: '',
      message: '',
    };
  },
  methods: {
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/scss/profile.scss';
</style>
