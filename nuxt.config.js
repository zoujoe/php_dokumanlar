
require('dotenv').config()

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#180c45' },
      { name: 'theme-color', content: '#180c45' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:text:title', content: 'tasteful' },
      { name: 'twitter:image', content: 'https://raw.githubusercontent.com/lachlantula/tasteful/master/assets/images/tasteful-icon.png' },
      { name: 'twitter:text:description', content: 'The greatest online music community.' },
      { name: 'monetization', content: '$ilp.uphold.com/Jgjj7JNxj8fW' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', color: '#6040dd', href: '/safari-pinned-tab.svg' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#6040dd' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-resize',
    {
      src: '~/plugins/vuex-persist',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */