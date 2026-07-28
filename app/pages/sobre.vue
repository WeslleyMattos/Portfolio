<template>
  <div class="relative min-h-screen">
    <!-- Fundo: muda conforme o modo escolhido -->
    <div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Transition name="bg-fade">
        <!-- Modo criativo: arte do dragão -->
        <div
          v-if="mode === 'criativo'"
          key="criativo"
          class="absolute inset-0 bg-ink-950"
        >
          <div
            class="absolute inset-0 bg-cover bg-center opacity-35"
            style="background-image: url('/dragon.png')"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/70 to-ink-950" />
        </div>

        <!-- Modo profissional: fundo sóbrio -->
        <div v-else key="profissional" class="absolute inset-0 bg-ink-950">
          <div class="bg-grid absolute inset-0 opacity-50" />
          <div
            class="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent-500/12 blur-[130px]"
          />
          <div
            class="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-glow-500/10 blur-[130px]"
          />
        </div>
      </Transition>
    </div>

    <section class="container mx-auto px-5 pt-32 pb-24 lg:px-8">
      <!-- Barra de controle do modo -->
      <div
        v-if="mode"
        class="surface-glass mx-auto mb-10 flex max-w-6xl flex-col items-center justify-between gap-4 rounded-2xl px-5 py-4 sm:flex-row"
      >
        <p class="flex items-center gap-2.5 text-sm text-fg-muted">
          <i
            :class="mode === 'criativo' ? 'bx bx-dice-6' : 'bx bx-briefcase-alt-2'"
            class="text-xl"
            :style="{ color: mode === 'criativo' ? '#fb923c' : '#22d3ee' }"
            aria-hidden="true"
          />
          Você está no
          <strong class="font-semibold text-fg">
            {{ mode === 'criativo' ? 'Modo Criativo' : 'Modo Profissional' }}
          </strong>
        </p>

        <div class="flex flex-wrap items-center justify-center gap-2.5">
          <a
            v-if="RESUME.available"
            :href="RESUME.path"
            :download="RESUME.fileName"
            class="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-fg transition-all duration-300 hover:border-accent-400 hover:bg-accent-500/10 hover:text-accent-300"
          >
            <i class="bx bx-download" aria-hidden="true" />
            Currículo
          </a>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-400"
            @click="toggleMode"
          >
            <i class="bx bx-transfer-alt text-base" aria-hidden="true" />
            Ver o {{ mode === 'criativo' ? 'Modo Profissional' : 'Modo Criativo' }}
          </button>
        </div>
      </div>

      <!-- Conteúdo -->
      <Transition name="profile" mode="out-in">
        <AboutCreativeProfile v-if="mode === 'criativo'" key="criativo" />
        <div v-else-if="mode === 'profissional'" key="profissional" class="mx-auto max-w-6xl">
          <AboutProfessionalProfile />
        </div>

        <!-- Enquanto o diálogo está aberto e nada foi escolhido -->
        <div v-else key="loading" class="py-32 text-center" role="status">
          <p class="text-fg-muted">Carregando perfil…</p>
        </div>
      </Transition>
    </section>

    <AboutModeDialog :open="dialogOpen" @select="setMode" @dismiss="closeDialog" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { CONTACT } from '~/data/contact'
import { RESUME } from '~/data/profile'

useSeoMeta({
  title: 'Sobre mim',
  description:
    'Conheça Weslley Renan Mattos: competências, o que entrego como desenvolvedor frontend e uma versão criativa do perfil em formato de ficha de RPG.',
  ogTitle: `Sobre ${CONTACT.name}`,
})

const { mode, dialogOpen, restore, setMode, toggleMode, closeDialog } = useAboutMode()

onMounted(restore)
</script>

<style scoped>
.profile-enter-active,
.profile-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}
.profile-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.profile-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 0.5s ease;
}
.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}
.bg-fade-leave-active {
  position: absolute;
  inset: 0;
}
</style>
