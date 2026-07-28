<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-950 px-5 text-center"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="bg-grid absolute inset-0 opacity-50" />
      <div
        class="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-500/15 blur-[130px]"
      />
    </div>

    <div class="relative z-10 max-w-lg">
      <p class="text-8xl font-extrabold text-gradient-accent sm:text-9xl">
        {{ error?.statusCode || 500 }}
      </p>

      <h1 class="mt-4 text-2xl font-bold text-fg sm:text-3xl">
        {{ isNotFound ? 'Essa página não existe' : 'Algo deu errado' }}
      </h1>

      <p class="mt-3 text-fg-muted">
        {{
          isNotFound
            ? 'O link pode estar quebrado ou a página foi movida. Vamos te levar de volta.'
            : 'Tivemos um problema inesperado. Tente novamente em instantes.'
        }}
      </p>

      <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/40"
          @click="handleError"
        >
          <i class="bx bx-home-alt text-xl" aria-hidden="true" />
          Voltar ao início
        </button>

        <NuxtLink
          to="/projetos"
          class="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-3.5 font-semibold text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
          @click="clearError"
        >
          <i class="bx bx-briefcase-alt-2 text-xl" aria-hidden="true" />
          Ver projetos
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  error: { type: Object, default: null },
})

useSeoMeta({
  title: props.error?.statusCode === 404 ? 'Página não encontrada' : 'Erro',
  robots: 'noindex',
})

const isNotFound = computed(() => props.error?.statusCode === 404)

const handleError = () => clearError({ redirect: '/' })
</script>
