import TerserPlugin from 'terser-webpack-plugin'
require('dotenv').config()
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || 'おねがいアプリ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/localStorage', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.node = { fs: 'empty', tls: 'empty' }
    },
    build: {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: false
          })
        ]
      }
    }
  },
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:4000/api',
  },
  googleAnalytics: {
    id: 'UA-178462133-1'
  },
  manifest: {
    name: 'おねがいアプリ',
    lang: 'ja',
    start_url: '/',
    icons: [
      {
        src: 'static/icon.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    bnbServerUrl: process.env.BNB_SERVER_URL || 'https://op.bnbplus.work',
    bnbTokenEndpoint: process.env.BNB_TOKEN_ENDPOINT || 'https://op.bnbplus.work/token',
    bnbClientId: process.env.BNB_CLIENT_ID || 123456789,
    bnbGrantType: process.env.BNB_GRANT_TYPE || 'authorization_code'
  }
}
