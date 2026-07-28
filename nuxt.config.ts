import tailwindcss from "@tailwindcss/vite";

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "https://weslleymattos.com.br";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  modules: ["@nuxt/image", "@nuxt/ui", "@vueuse/motion/nuxt"],

  css: ["boxicons/css/boxicons.min.css", "~/assets/css/tailwind.css"],

  runtimeConfig: {
    public: { siteUrl },
  },

  image: {
    quality: 78,
    format: ["webp", "png"],
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
  },

  app: {
    head: {
      htmlAttrs: { lang: "pt-BR" },
      link: [
        { rel: "icon", type: "image/png", href: "/logo.png" },
        { rel: "apple-touch-icon", href: "/logo.png" },
      ],
      meta: [
        { name: "theme-color", content: "#0b1120" },
        { name: "format-detection", content: "telephone=no" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  nitro: {
    prerender: {
      routes: ["/", "/sobre", "/projetos", "/curriculo"],
    },
  },

  vite: {
    plugins: [tailwindcss()],
    build: { sourcemap: false },
  },
});
