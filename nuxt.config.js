
require('dotenv').config()
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/axios',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  axios: {
    baseURL: 'http://localhost:4000/api' || process.env.API_BASE_URL,
  },
  env: {
    baseUrl: 'http://localhost:3000' || process.env.BASE_URL,
    bnbServerUrl: 'https://op.bnbplus.work' || process.env.BNB_SERVER_URL,
    bnbTokenEndpoint: 'https://op.bnbplus.work/token' || process.env.BNB_TOKEN_ENDPOINT,
    bnbClientId: 123456789 || process.env.BNB_CLIENT_ID,
    bnbGrantType: 'authorization_code' || process.env.BNB_GRANT_TYPE
  }
}
