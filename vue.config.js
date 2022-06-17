const { defineConfig } = require('@vue/cli-service')
const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    workboxPluginMode: "GenerateSW",
  },
  configureWebpack: config => {
    config.plugins.push(
      new GenerateSW({
        cacheId: "offline-map",
        skipWaiting: false,
        clientsClaim: false,
        swDest: './dist/service-worker.js'
      })
    )
  }
})
