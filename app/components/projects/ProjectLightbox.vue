<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="open"
        ref="dialogRef"
        class="fixed inset-0 z-[9999] flex flex-col bg-ink-950/97 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        :aria-label="`Galeria de imagens do projeto ${project?.title}`"
        tabindex="-1"
        @keydown="handleKeydown"
        @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd"
      >
        <!-- Barra superior -->
        <header
          class="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3.5 sm:px-6"
        >
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold text-fg sm:text-base">
              {{ project?.title }}
            </p>
            <p class="text-xs text-fg-subtle">
              Imagem {{ index + 1 }} de {{ images.length }}
            </p>
          </div>

          <button
            ref="closeBtnRef"
            type="button"
            class="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 text-2xl text-fg-muted transition-colors hover:bg-white/10 hover:text-fg"
            aria-label="Fechar galeria"
            @click="close"
          >
            <i class="bx bx-x" aria-hidden="true" />
          </button>
        </header>

        <!-- Palco -->
        <div class="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
          <Imagem
            :key="images[index]"
            :src="images[index]"
            :alt="`${project?.title} — imagem ${index + 1} de ${images.length}`"
            quality="88"
            class="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
          />

          <template v-if="images.length > 1">
            <button
              type="button"
              class="nav-btn left-3 sm:left-6"
              aria-label="Imagem anterior"
              @click="prev"
            >
              <i class="bx bx-chevron-left" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="nav-btn right-3 sm:right-6"
              aria-label="Próxima imagem"
              @click="next"
            >
              <i class="bx bx-chevron-right" aria-hidden="true" />
            </button>
          </template>
        </div>

        <!-- Miniaturas -->
        <footer
          v-if="images.length > 1"
          class="shrink-0 border-t border-white/10 px-4 py-3 sm:px-6"
        >
          <ul class="flex justify-center gap-2 overflow-x-auto pb-1">
            <li v-for="(image, i) in images" :key="image">
              <button
                type="button"
                class="block h-14 w-20 overflow-hidden rounded-lg border-2 transition-all duration-200 sm:h-16 sm:w-24"
                :class="
                  i === index
                    ? 'border-accent-500 opacity-100'
                    : 'border-transparent opacity-45 hover:opacity-80'
                "
                :aria-label="`Ir para a imagem ${i + 1}`"
                :aria-current="i === index ? 'true' : undefined"
                @click="index = i"
              >
                <Imagem
                  :src="image"
                  alt=""
                  width="96"
                  height="64"
                  quality="55"
                  loading="lazy"
                  class="h-full w-full object-cover"
                />
              </button>
            </li>
          </ul>
        </footer>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps({
  project: { type: Object, default: null },
  open: { type: Boolean, default: false },
  startIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['close'])

const index = ref(0)
const dialogRef = ref(null)
const closeBtnRef = ref(null)
const touchStartX = ref(0)

const images = computed(() => props.project?.images ?? [])

const next = () => {
  index.value = (index.value + 1) % images.value.length
}

const prev = () => {
  index.value = index.value === 0 ? images.value.length - 1 : index.value - 1
}

const close = () => emit('close')

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    close()
  } else if (event.key === 'ArrowRight') {
    next()
  } else if (event.key === 'ArrowLeft') {
    prev()
  } else if (event.key === 'Tab') {
    // Mantém o foco preso dentro do diálogo
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
}

const handleTouchStart = (event) => {
  touchStartX.value = event.touches[0].clientX
}

const handleTouchEnd = (event) => {
  if (images.value.length < 2) return
  const delta = touchStartX.value - event.changedTouches[0].clientX
  if (Math.abs(delta) > 60) {
    delta > 0 ? next() : prev()
  }
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      index.value = props.startIndex
      document.body.style.overflow = 'hidden'
      await nextTick()
      closeBtnRef.value?.focus()
    } else {
      document.body.style.overflow = ''
    }
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.nav-btn {
  position: absolute;
  top: 50%;
  display: grid;
  height: 3rem;
  width: 3rem;
  translate: 0 -50%;
  place-items: center;
  border-radius: 9999px;
  border: 1px solid rgb(255 255 255 / 0.12);
  background-color: rgb(10 15 28 / 0.8);
  font-size: 1.75rem;
  color: var(--color-fg);
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;
}

.nav-btn:hover {
  background-color: var(--color-accent-500);
  border-color: var(--color-accent-500);
  scale: 1.06;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
