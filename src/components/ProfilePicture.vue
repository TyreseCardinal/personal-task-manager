<template>
  <div>
    <form>
      <h3>Upload Profile Picture</h3>
      <input type="file" @change="onFileChange" />
      <button @click.prevent="uploadProfilePicture">Upload</button>
    </form>

    <!-- Display the uploaded profile picture -->
    <div v-if="profilePictureUrl">
      <h4>Profile Picture:</h4>
      <img :src="profilePictureUrl" alt="Profile Picture" />
    </div>

    <div v-if="uploadMessage">{{ uploadMessage }}</div>
  </div>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  data() {
    return {
      selectedFile: null,
      uploadMessage: '',
      profilePictureUrl: ''  // Store the uploaded image URL
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadProfilePicture() {
      const access_token = Vue.$cookies.get('access_token');
      if (!access_token) {
        this.uploadMessage = 'You are not logged in.';
        return;
      }

      const formData = new FormData();
      formData.append('profile_picture', this.selectedFile);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.uploadMessage = 'Upload successful!';
        this.profilePictureUrl = response.data.profile_picture_url;
      } catch (error) {
        console.error(error);
        this.uploadMessage = 'Upload failed.';
      }
    }

  },
};
</script>

<style scoped>
img {
  max-width: 200px;
  border-radius: 50%;
}
</style>
