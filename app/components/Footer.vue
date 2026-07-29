<template>
  <footer class="relative border-t border-white/10 bg-ink-950">
    <!-- Brilho decorativo no topo -->
    <div
      class="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent"
      aria-hidden="true"
    />

    <div class="container mx-auto px-5 py-14 lg:px-8">
      <!-- Centralizado no mobile, alinhado à esquerda a partir de md -->
      <div class="grid gap-10 text-center md:grid-cols-[1.5fr_1fr_1fr] md:text-left">
        <!-- Marca -->
        <div class="flex flex-col items-center md:items-start">
          <NuxtLink to="/" class="flex items-center gap-2.5 text-lg font-bold">
            <span
              class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-sm font-black text-ink-950"
            >
              WM
            </span>
            <span class="text-fg">Weslley</span>
          </NuxtLink>

          <p class="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
            {{ CONTACT.role }} focado em interfaces modernas, acessíveis e performáticas
            com Vue, Nuxt e Tailwind CSS.
          </p>

          <div class="mt-5 flex justify-center gap-3 md:justify-start">
            <a
              v-for="social in SOCIAL_LINKS"
              :key="social.label"
              :href="social.href"
              :target="social.external ? '_blank' : undefined"
              :rel="social.external ? 'noopener noreferrer' : undefined"
              :aria-label="social.ariaLabel"
              class="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-lg text-fg-muted transition-all duration-300 hover:-translate-y-1"
              :class="social.color"
            >
              <i :class="social.icon" aria-hidden="true" />
            </a>
          </div>
        </div>

        <!-- Navegação -->
        <nav aria-labelledby="footer-nav-title">
          <h2
            id="footer-nav-title"
            class="mb-4 text-xs font-semibold tracking-[0.18em] text-fg-subtle uppercase"
          >
            Navegação
          </h2>
          <ul class="space-y-2.5 text-sm">
            <li v-for="item in navItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="text-fg-muted transition-colors hover:text-accent-400"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Contato -->
        <div>
          <h2 class="mb-4 text-xs font-semibold tracking-[0.18em] text-fg-subtle uppercase">
            Contato
          </h2>
          <ul class="space-y-2.5 text-sm">
            <li>
              <a
                :href="`mailto:${CONTACT.email}`"
                class="flex items-center justify-center gap-2 break-all text-fg-muted transition-colors hover:text-accent-400 md:justify-start"
              >
                <i class="bx bx-envelope shrink-0 text-base" aria-hidden="true" />
                {{ CONTACT.email }}
              </a>
            </li>
            <li>
              <a
                :href="WHATSAPP_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 text-fg-muted transition-colors hover:text-accent-400 md:justify-start"
              >
                <i class="bx bxl-whatsapp text-base" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li
              class="flex items-center justify-center gap-2 text-fg-muted md:justify-start"
            >
              <i class="bx bx-map text-base" aria-hidden="true" />
              {{ CONTACT.location }}
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 border-t border-white/10 pt-6 text-center text-xs text-fg-subtle"
      >
        <p>© {{ year }} {{ CONTACT.name }}. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const {
  contato: CONTACT,
  linksSociais: SOCIAL_LINKS,
  whatsappUrl: WHATSAPP_URL,
} = useConteudo()

const navItems = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre mim' },
  { to: '/projetos', label: 'Projetos' },
]

const year = new Date().getFullYear()
</script>
