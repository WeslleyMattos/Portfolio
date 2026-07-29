<template>
  <div class="min-h-screen bg-ink-950 text-fg">
    <div class="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 lg:flex-row lg:px-8">
      <!-- Navegação lateral -->
      <aside class="lg:w-60 lg:shrink-0">
        <div class="flex items-center gap-2.5 pb-6">
          <span
            class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-sm font-black text-ink-950"
          >
            WM
          </span>
          <div>
            <p class="text-sm font-bold">Painel</p>
            <p class="text-xs text-fg-subtle">weslleymattos.com.br</p>
          </div>
        </div>

        <nav class="flex gap-1.5 overflow-x-auto lg:flex-col lg:overflow-visible">
          <NuxtLink v-for="item in itens" :key="item.to" :to="item.to" class="item-nav">
            <i :class="item.icone" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </nav>

        <div class="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5">
          <a href="/" target="_blank" rel="noopener" class="item-nav">
            <i class="bx bx-link-external" aria-hidden="true" />
            <span>Ver o site</span>
          </a>
          <button type="button" class="item-nav text-left" @click="encerrar">
            <i class="bx bx-log-out" aria-hidden="true" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <!-- Conteúdo -->
      <main class="min-w-0 flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const { sair } = useAdminApi()

const itens = [
  { to: '/admin', label: 'Métricas', icone: 'bx bx-line-chart' },
  { to: '/admin/perfil', label: 'Perfil', icone: 'bx bx-user' },
  { to: '/admin/curriculo', label: 'Currículo', icone: 'bx bx-file' },
  { to: '/admin/projetos', label: 'Projetos', icone: 'bx bx-briefcase-alt-2' },
]

const encerrar = async () => {
  await sair()
  await navigateTo('/admin/login')
}
</script>

<style scoped>
.item-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  white-space: nowrap;
  border-radius: 0.7rem;
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-fg-muted);
  transition: all 0.2s ease;
}

.item-nav i {
  font-size: 1.15rem;
}

.item-nav:hover {
  background-color: rgb(255 255 255 / 0.06);
  color: var(--color-fg);
}

/* exact evita que /admin fique ativo em todas as subrotas */
.item-nav.router-link-exact-active {
  background-color: rgb(249 115 22 / 0.12);
  color: var(--color-accent-400);
}
</style>
