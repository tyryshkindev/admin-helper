export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      title: 'Помощник администрации HASSLE ONLINE'
    }
  },
  colorMode: {
    preference: 'light'
  }
})