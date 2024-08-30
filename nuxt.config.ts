// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    head: {
      title: "CuCuS UI",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  css: ["~/assets/css/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],
  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/fonts", '@vesp/nuxt-fontawesome'],
  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },
  fonts: {
    families: [
      {
        name: 'MiSans',
        src: '/font/MiSans-Regular.otf',
        weight: 'regular'
      },
      {
        name: 'MiSans',
        src: '/font/MiSans-Normal.otf',
        weight: 'normal'
      },
      {
        name: 'MiSans',
        src: '/font/MiSans-Medium.otf',
        weight: 'medium'
      },
      {
        name: 'MiSans',
        src: '/font/MiSans-Bold.otf',
        weight: 'bold'
      },
    ]
  },
  ssr: false
});
