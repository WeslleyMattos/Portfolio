<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-card border border-white/8 bg-ink-850 transition-all duration-500 hover:-translate-y-2 hover:border-accent-500/40 hover:shadow-[var(--shadow-lift)]"
  >
    <!-- Área da imagem -->
    <div
      class="relative overflow-hidden bg-ink-900"
      :class="featured ? 'aspect-[16/10]' : 'aspect-[16/11]'"
    >
      <NuxtImg
        :src="project.images[0]"
        :alt="`Captura de tela do projeto ${project.title}`"
        :width="featured ? 900 : 640"
        :height="featured ? 562 : 440"
        format="webp"
        quality="80"
        :loading="eager ? 'eager' : 'lazy'"
        class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      <!-- Véu escuro que some no hover -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent transition-opacity duration-500 group-hover:opacity-70"
        aria-hidden="true"
      />

      <!-- Etiqueta de categoria -->
      <span
        class="absolute top-4 left-4 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-fg backdrop-blur-sm"
      >
        {{ project.category }}
      </span>

      <!-- Contador de imagens -->
      <span
        class="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 text-[0.7rem] font-semibold text-fg backdrop-blur-sm"
      >
        <i class="bx bx-image" aria-hidden="true" />
        {{ project.images.length }}
      </span>

      <!-- Botão de abrir a galeria.
           Em telas com hover ele aparece no hover/foco; em telas de toque
           fica sempre visível, senão ficaria inalcançável no celular. -->
      <div class="card-cta absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          class="flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 font-semibold text-white shadow-xl shadow-accent-500/40"
          :aria-label="`Abrir galeria de ${project.title} com ${project.images.length} imagens`"
          @click="$emit('open', project)"
        >
          <i class="bx bx-expand-alt text-lg" aria-hidden="true" />
          Ver galeria
        </button>
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="flex flex-1 flex-col p-6">
      <p class="text-xs font-semibold tracking-[0.15em] text-accent-400 uppercase">
        {{ project.tagline }}
      </p>

      <h3
        class="mt-2 font-bold text-fg transition-colors duration-300 group-hover:text-accent-300"
        :class="featured ? 'text-2xl' : 'text-xl'"
      >
        {{ project.title }}
      </h3>

      <p class="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
        {{ project.description }}
      </p>

      <ul class="mt-5 flex flex-wrap gap-2">
        <li
          v-for="tag in project.tags"
          :key="tag"
          class="rounded-lg border border-glow-500/25 bg-glow-500/8 px-2.5 py-1 text-[0.7rem] font-medium text-glow-300"
        >
          {{ tag }}
        </li>
      </ul>

      <a
        v-if="project.url"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 transition-colors hover:text-accent-300"
      >
        Acessar o site
        <i class="bx bx-link-external" aria-hidden="true" />
      </a>
    </div>
  </article>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true },
  featured: { type: Boolean, default: false },
  eager: { type: Boolean, default: false },
})

defineEmits(['open'])
</script>

<style scoped>
.card-cta {
  transition:
    opacity 0.4s ease,
    scale 0.3s ease;
}

/* Só esconde o botão onde existe hover de verdade (mouse).
   Em telas de toque ele permanece sempre visível. */
@media (hover: hover) and (pointer: fine) {
  .card-cta {
    opacity: 0;
    scale: 0.92;
  }

  /* Reaparece no hover do card e também quando recebe foco via teclado */
  .group:hover .card-cta,
  .card-cta:focus-within {
    opacity: 1;
    scale: 1;
  }
}
</style>
