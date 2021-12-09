const mockMiddleware = require('./mock')

module.exports = {
  outputDir: 'static',
  chainWebpack: config => {
      config
        .plugin('html')
        .tap(args => {
          args[0].title = process.env.VUE_APP_TITLE
          return args
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
    before (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      devServer.use('/mock', mockMiddleware)
    },
    proxy: {
      '^/proxy': {
        target: process.env.VUE_APP_SERVER_URL,
        pathRewrite: {
          '^/proxy': '/'
        },
        ws: true,
        changeOrigin: true
      }
    }
  }
}
