export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
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