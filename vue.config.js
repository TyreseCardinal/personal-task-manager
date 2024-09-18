const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/scss/global.scss";`
      },
      scss: {
        additionalData: `@import "@/styles/scss/global.scss";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
};
