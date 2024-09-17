// vue.config.js

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/_colors.scss";`
      }
    }
  }
};
