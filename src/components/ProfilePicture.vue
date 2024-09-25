<template>
  <div>
    <h3>Upload Profile Picture</h3>
    <form @submit.prevent="uploadProfilePicture">
      <input type="file" @change="onFileChange" accept="image/*" />
      <button type="submit">Upload</button>
    </form>
    <div v-if="uploadMessage">{{ uploadMessage }}</div>
    <div v-if="imageUrl">
      <h4>Your Profile Picture:</h4>
      <img :src="imageUrl" alt="Profile Picture" class="profile-image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Ensure you have axios imported

export default {
  data() {
    return {
      selectedFile: null,
      uploadMessage: '',
      imageUrl: null // To store the uploaded image URL
    };
  },
  mounted() {
    // Load the image URL from local storage if it exists
    const storedImageUrl = localStorage.getItem('profileImageUrl');
    if (storedImageUrl) {
      this.imageUrl = storedImageUrl; // Load the stored image URL
    }
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];

      // Optionally, you can preview the image before uploading
      if (this.selectedFile) {
        this.imageUrl = URL.createObjectURL(this.selectedFile);
      } else {
        this.imageUrl = null;
      }
    },
    async uploadProfilePicture() {
      if (!this.selectedFile) {
        this.uploadMessage = 'Please select a file to upload.';
        return;
      }

      const formData = new FormData();
      formData.append('profile_picture', this.selectedFile);

      try {
        // Get the token from cookies
        const access_token = this.$cookies.get('access_token');
        console.log("Access Token: ", access_token); // Debugging token presence

        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}` // Include the token in the request headers
          }
        });

        this.uploadMessage = 'Upload successful!';
        this.imageUrl = response.data.profile_picture; // Assuming your server returns the image filename
        localStorage.setItem('profileImageUrl', this.imageUrl); // Save to local storage
      } catch (error) {
        console.error(error);
        this.uploadMessage = 'Upload failed. Please try again.';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/scss/Profile.scss';
</style>
