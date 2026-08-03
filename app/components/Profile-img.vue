<template>
  <div class="relative flex items-center justify-center" :class="sizeClass">
    <!-- Halo difuso -->
    <div
      class="absolute inset-0 scale-110 rounded-full bg-accent-500/20 blur-3xl"
      aria-hidden="true"
    />

    <!-- Anel gradiente animado -->
    <div
      class="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,var(--color-glow-400)_25%,var(--color-accent-500)_50%,transparent_75%)] p-[3px] animate-spin-slow"
      aria-hidden="true"
    >
      <div class="h-full w-full rounded-full bg-ink-950" />
    </div>

    <!-- Foto -->
    <Imagem
      :src="src"
      :alt="alt"
      :width="pixelSize"
      :height="pixelSize"
      quality="85"
      :loading="priority ? 'eager' : 'lazy'"
      :preload="priority"
      class="relative z-10 rounded-full border-4 border-ink-950 object-cover"
      :class="imageClass"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Foto de perfil' },
  size: { type: String, default: 'md' }, // sm | md | lg
  priority: { type: Boolean, default: false },
})

const sizeClass = computed(
  () => ({ sm: 'w-48 h-48', md: 'w-80 h-80', lg: 'w-96 h-96' })[props.size],
)

const imageClass = computed(
  () =>
    ({ sm: 'w-44 h-44', md: 'w-72 h-72', lg: 'w-[22rem] h-[22rem]' })[props.size],
)

const pixelSize = computed(() => ({ sm: 176, md: 288, lg: 352 })[props.size])
</script>
