import tailwindcss from "@tailwindcss/vite";

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "https://weslleymattos.com.br";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  modules: ["@nuxt/image", "@nuxt/ui", "@vueuse/motion/nuxt"],

  css: ["boxicons/css/boxicons.min.css", "~/assets/css/tailwind.css"],

  runtimeConfig: {
    /**
     * Onde vivem o conteúdo editável e os uploads. Precisa ficar FORA do
     * .output: o deploy substitui aquele diretório inteiro a cada push.
     * Em produção, definido por NUXT_CONTEUDO_DIR no PM2.
     */
    conteudoDir: './dados',
    /** Hash scrypt da senha do painel — gere com `npm run senha-admin` */
    adminSenhaHash: '',
    /** Segredo que assina o cookie de sessão do painel */
    adminSessaoSegredo: '',
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

  /**
   * O prerender destas rotas foi removido de propósito.
   *
   * Elas eram HTML congelado no build, o que era ótimo para performance mas
   * incompatível com o painel admin: uma edição salva em runtime nunca
   * apareceria numa página gerada em tempo de build. Agora são SSR, sem
   * cache, para que o que você salva no painel valha na hora.
   */
  routeRules: {
    // O painel não deve ser indexado nem cacheado por intermediários.
    "/admin/**": {
      headers: { "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" },
    },
  },

  vite: {
    plugins: [tailwindcss()],
    build: { sourcemap: false },
  },
});
