export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-icon', '@nuxtjs/tailwindcss', "@nuxt/eslint"],
  app: {
    head: {
      title: 'Помощник администрации HASSLE ONLINE'
    }
  },
  colorMode: {
    preference: 'light'
  }
})