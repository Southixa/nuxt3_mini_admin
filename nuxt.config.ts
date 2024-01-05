// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/google-fonts',
    '@nuxtjs/apollo',
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://rlthcrbelmcmplfoglcj.hasura.ap-southeast-1.nhost.run/v1/graphql',
        browserHttpEndpoint: '',
        wsEndpoint: '',
        httpLinkOptions: {},
        wsLinkOptions: {},
        websocketsOnly: false,
        connectToDevTools: false,
        defaultOptions: {},
        inMemoryCacheOptions: {},
        tokenName: 'token',
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization'
      },
    }
  },
  googleFonts: {
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
        ital: [100, 300, 400, 500, 700, 900]
      },
      'Josefin+Sans': true,
      Lato: [100, 300],
      'Noto Sans Lao': {
        wght: '100..900',
      },
    },
    display: 'swap'
  },
  css: ['@/assets/main.css'],
  
  tailwindcss: {
    exposeConfig: true
  },
})
