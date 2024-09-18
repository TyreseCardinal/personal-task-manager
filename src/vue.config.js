// vue.config.js

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "../src/styles/scss/global.scss";`
      }
    }
  }
};
