import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
  },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/motion/nuxt',
  ],

  css: [
    '@/assets/css/tailwind.css',
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ]
    }
  }
});
