<template>
  <Transition name="back-to-top">
    <button
      v-show="visible"
      type="button"
      class="fixed right-5 bottom-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-accent-500 text-2xl text-white shadow-lg shadow-accent-500/40 transition-colors duration-300 hover:bg-accent-400 sm:right-8 sm:bottom-8"
      aria-label="Voltar ao topo da página"
      @click="scrollToTop"
    >
      <i class="bx bx-chevron-up" aria-hidden="true" />
    </button>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

/** Aparece depois de rolar mais de uma tela */
const visible = ref(false)

const handleScroll = () => {
  visible.value = window.scrollY > window.innerHeight * 0.8
}

const scrollToTop = () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(14px) scale(0.9);
}
</style>
