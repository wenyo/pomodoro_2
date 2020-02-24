const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/pomodoro_2/'
      : '/',
      css: {
        loaderOptions: {
          scss: {
            prependData: `@import "~@/assets/css/variables.scss";`
          },
        }
      }
  }