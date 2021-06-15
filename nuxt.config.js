export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'adminAcademy',
    htmlAttrs: { 
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],  
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "http://localhost:8000/css/bootstrap.css" },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" },
      { rel: 'preconnect', href: "https://fonts.gstatic.com" },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" },
      { rel: 'stylesheet', href: "http://unpkg.com/view-design/dist/styles/iview.css" },
      { rel: 'stylesheet', href: "http://localhost:8000/css/common.css" },
      { rel: 'stylesheet', href: "http://localhost:8000/css/responsive.css" },
      { rel: 'stylesheet', href: "http://localhost:8000/css/main.css" },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'iview/dist/styles/iview.css',
    'quill/dist/quill.core.css',
    // for snow theme
    'quill/dist/quill.snow.css',
    // for bubble theme
    'quill/dist/quill.bubble.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/iview',
     { src: '~/plugins/quill.js', ssr: false },
    { src: '~/plugins/vue-plyr.js', ssr: false }

    // '@/plugins/quill'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [ 
    // https://go.nuxtjs.dev/bootstrap
    '@nuxtjs/axios',
  ], 
  axios: {   
    baseURL: "http://localhost:3333/",
    credentials: true   
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    port: 8000, // default: 3000
    host: 'localhost' // default: localhost
  }
}
