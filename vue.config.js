const mockMiddleware = require('./mock')

module.exports = {
  chainWebpack: config => {
      config
        .plugin('html')
        .tap(args => {
          args[0].title = '在哪儿'
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
