import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/motion/nuxt',
  ],

  css: [
    '@/assets/css/tailwind.css',
  ],
});
