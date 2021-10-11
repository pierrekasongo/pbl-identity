module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '^/entreprise': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/visite': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/client': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/user': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/famille': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/tmp': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      }
    }
  },
  transpileDependencies: ["vuetify"]
};