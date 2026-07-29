<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="open"
        ref="dialogRef"
        class="fixed inset-0 z-[9998] flex items-center justify-center overflow-y-auto bg-ink-950/85 p-4 backdrop-blur-md sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mode-dialog-title"
        aria-describedby="mode-dialog-desc"
        tabindex="-1"
        @keydown="handleKeydown"
        @click.self="$emit('dismiss')"
      >
        <div
          class="my-auto w-full max-w-3xl rounded-card border border-white/10 bg-ink-900 p-6 shadow-2xl sm:p-9"
        >
          <!-- Cabeçalho -->
          <div class="text-center">
            <span
              class="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-accent-300"
            >
              <i class="bx bx-select-multiple" aria-hidden="true" />
              Escolha como quer me conhecer
            </span>

            <h2
              id="mode-dialog-title"
              class="mt-5 text-2xl font-bold text-fg sm:text-3xl"
            >
              Duas versões, <span class="text-gradient-accent">mesma pessoa</span>
            </h2>

            <p id="mode-dialog-desc" class="mx-auto mt-3 max-w-lg text-sm text-fg-muted">
              Você pode ver meu perfil no formato direto e objetivo, ou na versão criativa
              em ficha de RPG. Dá pra trocar a qualquer momento.
            </p>
          </div>

          <!-- Opções -->
          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              ref="firstOptionRef"
              type="button"
              class="mode-option group"
              @click="$emit('select', 'profissional')"
            >
              <span class="flex items-center gap-3">
                <span class="mode-icon bg-glow-500/12 text-glow-400 group-hover:bg-glow-500/20">
                  <i class="bx bx-briefcase-alt-2" aria-hidden="true" />
                </span>
                <span class="text-lg font-bold text-fg">Modo Profissional</span>
              </span>

              <span class="mt-3 block text-sm leading-relaxed text-fg-muted">
                Currículo completo: experiência, competências, stack e formação. Ideal
                para recrutadores e empresas.
              </span>

              <span class="mode-tag border-glow-500/30 bg-glow-500/10 text-glow-300">
                <i class="bx bx-time-five" aria-hidden="true" />
                Leitura de 1 minuto
              </span>
            </button>

            <button type="button" class="mode-option group" @click="$emit('select', 'criativo')">
              <span class="flex items-center gap-3">
                <span
                  class="mode-icon bg-accent-500/12 text-accent-400 group-hover:bg-accent-500/20"
                >
                  <i class="bx bx-dice-6" aria-hidden="true" />
                </span>
                <span class="text-lg font-bold text-fg">Modo Criativo</span>
              </span>

              <span class="mt-3 block text-sm leading-relaxed text-fg-muted">
                Minha ficha de personagem em RPG: atributos, perícias e equipamentos.
                Para quem curte criatividade e quer ver o lado divertido.
              </span>

              <span class="mode-tag border-accent-500/30 bg-accent-500/10 text-accent-300">
                <i class="bx bx-joystick" aria-hidden="true" />
                Interativo
              </span>
            </button>
          </div>

          <!-- Currículo + fechar -->
          <div
            class="mt-7 flex flex-col items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between"
          >
            <a
              v-if="RESUME.disponivel"
              href="/curriculo.pdf"
              :download="RESUME.nomeArquivo"
              class="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400 hover:bg-accent-500/10 hover:text-accent-300"
            >
              <i class="bx bx-download text-lg" aria-hidden="true" />
              Baixar currículo em PDF
            </a>

            <span
              v-else
              class="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-fg-subtle"
            >
              <i class="bx bx-file-blank text-lg" aria-hidden="true" />
              Currículo em PDF — em breve
            </span>

            <button
              type="button"
              class="text-sm font-medium text-fg-subtle underline-offset-4 transition-colors hover:text-fg hover:underline"
              @click="$emit('dismiss')"
            >
              Pular e ver o modo profissional
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'

const { perfil } = useConteudo()
const RESUME = computed(() => perfil.value.curriculo)

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['select', 'dismiss'])

const dialogRef = ref(null)
const firstOptionRef = ref(null)

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('dismiss')
    return
  }

  if (event.key !== 'Tab') return

  // Prende o foco dentro do diálogo
  const focusables = dialogRef.value?.querySelectorAll(
    'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
  )
  if (!focusables?.length) return

  const first = focusables[0]
  const last = focusables[focusables.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => props.open,
  async (isOpen) => {
    if (import.meta.server) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      await nextTick()
      firstOptionRef.value?.focus()
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<style scoped>
.mode-option {
  position: relative;
  /* flex-column em vez de block: o navegador centraliza o conteúdo de <button>
     verticalmente, o que desalinharia os títulos entre cards de alturas iguais
     mas textos de tamanhos diferentes. */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 1rem;
  border: 1px solid rgb(255 255 255 / 0.1);
  background-color: var(--color-ink-850);
  padding: 1.5rem;
  text-align: left;
  transition: all 0.3s ease;
}

/* A etiqueta fica sempre colada na base, alinhada entre os dois cards */
.mode-option .mode-tag {
  margin-top: auto;
  align-self: flex-start;
}

.mode-option:hover {
  transform: translateY(-4px);
  border-color: rgb(249 115 22 / 0.45);
  box-shadow: var(--shadow-lift);
}

.mode-icon {
  display: grid;
  height: 2.6rem;
  width: 2.6rem;
  flex-shrink: 0;
  place-items: center;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  transition: background-color 0.3s ease;
}

.mode-tag {
  margin-top: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 9999px;
  border-width: 1px;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 600;
  width: fit-content;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}
.dialog-enter-active .rounded-card,
.dialog-leave-active .rounded-card {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-from .rounded-card,
.dialog-leave-to .rounded-card {
  transform: scale(0.94) translateY(12px);
}
</style>
