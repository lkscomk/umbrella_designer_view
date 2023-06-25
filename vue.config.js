const { defineConfig } = require('@vue/cli-service')
const dotenv = require('dotenv')
const env = dotenv.config({ path: '.env' }).parsed

process.env.VUE_APP_TITLE = env.APP_TITLE
process.env.VUE_APP_URL = env.APP_URL

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})
