module.exports = {
  chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "在哪儿";
              return args;
          })
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/vars.scss";`
      }
    }
  },
  devServer: {
    proxy: 'http://182.61.16.208'
  }
}
