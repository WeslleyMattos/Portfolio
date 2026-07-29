<template>
  <div class="relative min-h-screen bg-ink-950">
    <!-- Fundo decorativo -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[36rem]" aria-hidden="true">
      <div class="bg-grid absolute inset-0 opacity-50" />
      <div
        class="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent-500/15 blur-[130px]"
      />
      <div
        class="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-glow-500/12 blur-[130px]"
      />
    </div>

    <section class="relative z-10 container mx-auto px-5 pt-32 pb-24 lg:px-8">
      <!-- Cabeçalho -->
      <header class="mx-auto mb-14 max-w-2xl text-center">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-accent-300"
        >
          <i class="bx bx-briefcase-alt-2" aria-hidden="true" />
          Portfólio
        </span>

        <h1 class="mt-5 text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          Meus <span class="text-gradient-accent">projetos</span>
        </h1>

        <p class="mt-4 text-fg-muted">
          Uma seleção de sistemas, painéis e landing pages que desenvolvi. Clique em
          qualquer projeto para ver a galeria completa de telas.
        </p>
      </header>

      <!-- Grade uniforme: todos os cards com o mesmo tamanho, sem buracos -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <ProjectsProjectCard
          v-for="(project, i) in projects"
          :key="project.id"
          :project="project"
          :eager="i < 3"
          @open="openLightbox"
        />
      </div>

      <!-- Chamada final -->
      <div class="surface-glass mt-20 rounded-card p-8 text-center sm:p-12">
        <h2 class="text-2xl font-bold text-fg sm:text-3xl">Gostou do que viu?</h2>
        <p class="mx-auto mt-3 max-w-lg text-fg-muted">
          Tenho interesse em novos desafios. Vamos conversar sobre o seu projeto.
        </p>
        <a
          :href="WHATSAPP_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-8 py-3.5 font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fb855] hover:shadow-xl hover:shadow-[#25d366]/35"
        >
          <i class="bx bxl-whatsapp text-xl" aria-hidden="true" />
          Entrar em contato
        </a>
      </div>
    </section>

    <ProjectsProjectLightbox
      :project="activeProject"
      :open="lightboxOpen"
      @close="closeLightbox"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { projetos: projects, whatsappUrl: WHATSAPP_URL } = useConteudo()

useSeoMeta({
  title: 'Projetos',
  description:
    'Galeria de projetos desenvolvidos por Weslley Renan Mattos: sistemas web, painéis analíticos e landing pages em Vue, Nuxt e Tailwind CSS.',
  ogTitle: 'Projetos — Weslley Renan Mattos',
})

const activeProject = ref(null)
const lightboxOpen = ref(false)
const lastFocused = ref(null)

const openLightbox = (project) => {
  lastFocused.value = document.activeElement
  activeProject.value = project
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
  // Devolve o foco ao card que abriu a galeria
  lastFocused.value?.focus?.()
}
</script>
