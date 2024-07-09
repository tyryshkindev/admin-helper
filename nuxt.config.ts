export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxtjs/tailwindcss',
    "@nuxt/eslint",
    '@nuxtjs/i18n'
  ],
  app: {
    head: {
      title: 'Помощник администрации HASSLE ONLINE'
    }
  },
  colorMode: {
    preference: 'light'
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'ru',
        iso: 'ru',
        name: 'Русский',
        file: 'ru.json'
      },
      {
        code: 'en-US',
        iso: 'en-US',
        name: 'English(US)',
        file: 'en-US.json'
      }
    ],
    defaultLocale: 'ru',

  },
  vueI18n: {
    fallbackLocale: 'ru'
  }
})
