<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 z-50 w-full transition-all duration-300"
    :class="
      scrolled || menuOpen
        ? 'surface-glass shadow-lg shadow-black/40'
        : 'border-b border-transparent bg-transparent'
    "
  >
    <div class="container mx-auto flex items-center justify-between px-5 py-4 lg:px-8">
      <NuxtLink
        to="/"
        class="group flex items-center gap-2.5 text-lg font-bold tracking-tight"
        aria-label="Weslley Renan — página inicial"
      >
        <span
          class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-sm font-black text-ink-950 shadow-lg shadow-accent-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        >
          WM
        </span>
        <span class="hidden text-fg sm:inline">Weslley</span>
      </NuxtLink>

      <!-- Navegação desktop -->
      <nav class="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-item">
          <i :class="item.icon" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </NuxtLink>

        <a
          :href="WHATSAPP_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-3 rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/40"
        >
          Vamos conversar
        </a>
      </nav>

      <!-- Botão do menu mobile -->
      <button
        type="button"
        class="grid h-10 w-10 place-items-center rounded-lg text-2xl text-fg transition-colors hover:bg-white/10 md:hidden"
        :aria-label="menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        @click="menuOpen = !menuOpen"
      >
        <i :class="menuOpen ? 'bx bx-x' : 'bx bx-menu'" aria-hidden="true" />
      </button>
    </div>

    <!-- Navegação mobile -->
    <Transition name="mobile-nav">
      <nav
        v-show="menuOpen"
        id="mobile-nav"
        class="border-t border-white/10 md:hidden"
        aria-label="Navegação principal"
      >
        <div class="flex flex-col gap-1 px-5 py-4">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-item-mobile"
            @click="menuOpen = false"
          >
            <i :class="item.icon" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </NuxtLink>

          <a
            :href="WHATSAPP_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 rounded-xl bg-accent-500 px-4 py-3 text-center font-semibold text-white"
            @click="menuOpen = false"
          >
            Vamos conversar
          </a>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

// Vem do conteúdo em runtime: se você trocar o telefone no painel, o link
// do WhatsApp acompanha sem precisar de rebuild.
const { whatsappUrl: WHATSAPP_URL } = useConteudo()

const navItems = [
  { to: '/', label: 'Início', icon: 'bx bx-home-alt' },
  { to: '/sobre', label: 'Sobre', icon: 'bx bx-user' },
  { to: '/projetos', label: 'Projetos', icon: 'bx bx-briefcase-alt-2' },
]

const headerRef = ref(null)
const menuOpen = ref(false)
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const handleClickOutside = (event) => {
  if (headerRef.value && !headerRef.value.contains(event.target)) {
    menuOpen.value = false
  }
}

const handleEscape = (event) => {
  if (event.key === 'Escape') menuOpen.value = false
}

watch(menuOpen, (open) => {
  if (open) {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
  } else {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleEscape)
  }
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.nav-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 0.6rem;
  font-size: 0.925rem;
  font-weight: 500;
  color: var(--color-fg-muted);
  transition: color 0.25s ease;
}

.nav-item i {
  font-size: 1.15rem;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0.15rem;
  left: 50%;
  height: 2px;
  width: 0;
  border-radius: 2px;
  background: var(--color-accent-400);
  transform: translateX(-50%);
  transition: width 0.28s ease;
}

.nav-item:hover {
  color: var(--color-fg);
}

.nav-item:hover::after,
.nav-item.router-link-active::after {
  width: 55%;
}

.nav-item.router-link-active {
  color: var(--color-accent-400);
}

.nav-item-mobile {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  font-weight: 500;
  color: var(--color-fg-muted);
  transition: all 0.25s ease;
}

.nav-item-mobile i {
  font-size: 1.3rem;
}

.nav-item-mobile:hover,
.nav-item-mobile.router-link-active {
  background-color: rgb(249 115 22 / 0.12);
  color: var(--color-accent-400);
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
