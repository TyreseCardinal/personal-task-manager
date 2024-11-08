<template>
  <main class="profile-container">
    <!-- File upload handled by ProfilePicture component -->
    <ProfilePicture />

    <!-- Static User Information Section -->
    <div class="user-info">
      <h2>User Information</h2>
      <p>Email: user@example.com</p>
      <p>Password: ********</p>
    </div>
  </main>
</template>

<script>
import ProfilePicture from '@/components/ProfilePicture.vue';

export default {
  components: {
    ProfilePicture,
  },
  data() {
    return {
      // Static user information for display purposes
      email: 'user@example.com',
      password: '********',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/scss/profile.scss';
</style>