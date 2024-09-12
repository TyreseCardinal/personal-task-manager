<template>
  <div>
    <h3>Upload Profile Picture</h3>
    <input type="file" @change="onFileChange" />
    <button @click="uploadProfilePicture">Upload</button>

    <div v-if="uploadMessage">{{ uploadMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      uploadMessage: ''
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadProfilePicture() {
      if (!this.selectedFile) {
        this.uploadMessage = 'Please select a file to upload.';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await axios.post('/auth/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        this.uploadMessage = response.data.message;
      } catch (error) {
        this.uploadMessage = error.response.data.message || 'Upload failed. Please try again.';
      }
    }
  }
};
</script>
