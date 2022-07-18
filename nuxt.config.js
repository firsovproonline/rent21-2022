export default {
  ymapkey: 'fdb945b0-aaa5-4b5d-a837-383abb24dfc4',
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 3021 // default: 3000
  },
  head: {
    title: 'rent21-2022',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    script: [
      {
        src: 'https://api-maps.yandex.ru/2.1/?apikey=fdb945b0-aaa5-4b5d-a837-383abb24dfc4&lang=ru_RU" type="text/javascript'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'}

    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/theme/index.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/api', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    sass: [],
    scss: [
      '@/theme/mixins/*.scss',
      '@/theme/vars/*.scss',
    ],
    less: [],
    stylus: [],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  serverMiddleware: {
    '/api': '~/api'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  },
};
