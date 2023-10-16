// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
  ],
  routeRules: {
    '/': {
      prerender: true,
    },
    '/api/packages': {
      cache: {
        maxAge: 60 * 60 * 24 * 7, // 1 week
      },
    },
  },
  devtools: { enabled: true },
})
