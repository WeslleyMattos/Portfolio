<template>
  <div>
    <!-- ============ HERO ============ -->
    <section
      class="relative flex min-h-screen items-center overflow-hidden bg-ink-950 px-5 pt-28 pb-20 lg:px-8"
    >
      <!-- Fundo decorativo -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="bg-grid absolute inset-0 opacity-60" />
        <div
          class="absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-accent-500/20 blur-[120px]"
        />
        <div
          class="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-glow-500/15 blur-[120px]"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950"
        />
      </div>

      <div
        class="relative z-10 container mx-auto grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]"
      >
        <!-- Texto -->
        <div class="text-center lg:text-left">
          <span
            class="inline-flex animate-[slideRight_0.7s_ease_forwards] items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-accent-300 opacity-0"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75"
              />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            Disponível para novos projetos
          </span>

          <h1
            class="mt-6 animate-[slideRight_0.7s_ease_forwards] text-5xl leading-[1.05] font-extrabold tracking-tight text-fg opacity-0 delay-100 sm:text-6xl lg:text-7xl"
          >
            Weslley
            <span class="block text-gradient-accent">Renan</span>
          </h1>

          <p
            class="mt-4 flex min-h-[2.5rem] animate-[slideRight_0.7s_ease_forwards] items-center justify-center text-xl font-semibold opacity-0 delay-200 sm:text-2xl lg:justify-start"
          >
            <span ref="typedTarget" class="text-glow-400" aria-hidden="true" />
            <span class="sr-only">
              Desenvolvedor Frontend, Web Developer, JavaScript Developer
            </span>
          </p>

          <p
            class="mx-auto mt-6 max-w-xl animate-[slideUp_0.7s_ease_forwards] text-base leading-relaxed text-fg-muted opacity-0 delay-300 lg:mx-0 lg:text-lg"
          >
            Transformo ideias em interfaces modernas, responsivas e performáticas
            usando <strong class="font-semibold text-fg">Vue</strong>,
            <strong class="font-semibold text-fg">Nuxt</strong> e
            <strong class="font-semibold text-fg">Tailwind CSS</strong> — sempre com foco
            em boas práticas e experiência do usuário.
          </p>

          <!-- CTAs -->
          <div
            class="mt-9 flex animate-[slideUp_0.7s_ease_forwards] flex-col justify-center gap-3 opacity-0 delay-[400ms] sm:flex-row lg:justify-start"
          >
            <NuxtLink
              to="/projetos"
              class="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/40"
            >
              Ver projetos
              <i
                class="bx bx-right-arrow-alt text-xl transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </NuxtLink>

            <NuxtLink
              to="/sobre"
              class="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-3.5 font-semibold text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
            >
              <i class="bx bx-user text-xl" aria-hidden="true" />
              Sobre mim
            </NuxtLink>
          </div>

          <!-- Redes sociais -->
          <div
            class="mt-9 flex animate-[slideUp_0.7s_ease_forwards] justify-center gap-3 opacity-0 delay-500 lg:justify-start"
          >
            <a
              v-for="social in SOCIAL_LINKS"
              :key="social.label"
              :href="social.href"
              :target="social.external ? '_blank' : undefined"
              :rel="social.external ? 'noopener noreferrer' : undefined"
              :aria-label="social.ariaLabel"
              class="grid h-11 w-11 place-items-center rounded-xl border border-white/12 text-xl text-fg-muted transition-all duration-300 hover:-translate-y-1"
              :class="social.color"
            >
              <i :class="social.icon" aria-hidden="true" />
            </a>
          </div>
        </div>

        <!-- Foto -->
        <div
          class="flex animate-[slideLeft_0.8s_ease_forwards] justify-center opacity-0 delay-300"
        >
          <ProfileImg
            :src="perfil.fotoPerfil"
            :alt="`${CONTACT.name}, ${CONTACT.role}`"
            size="lg"
            priority
            class="animate-float"
          />
        </div>
      </div>

    </section>

    <!-- ============ STACK ============ -->
    <section class="relative border-y border-white/8 bg-ink-900 py-16" aria-labelledby="stack-title">
      <div class="container mx-auto px-5 lg:px-8">
        <h2
          id="stack-title"
          class="mb-10 text-center text-xs font-semibold tracking-[0.2em] text-fg-subtle uppercase"
        >
          Tecnologias que uso no dia a dia
        </h2>

        <ul class="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <li
            v-for="tech in stack"
            :key="tech.name"
            class="group flex items-center gap-2.5 rounded-2xl border border-white/8 bg-ink-850 px-5 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:bg-ink-800"
          >
            <!-- Ícones de marca vêm do Iconify; o resto do Boxicons -->
            <UIcon
              v-if="tech.iconify"
              :name="tech.iconify"
              class="size-6 transition-transform duration-300 group-hover:scale-110"
              :style="{ color: tech.color }"
              aria-hidden="true"
            />
            <i
              v-else
              :class="tech.icon"
              class="text-2xl transition-transform duration-300 group-hover:scale-110"
              :style="{ color: tech.color }"
              aria-hidden="true"
            />
            <span class="text-sm font-medium text-fg-muted group-hover:text-fg">
              {{ tech.name }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============ CTA FINAL ============ -->
    <section class="relative overflow-hidden bg-ink-900 py-24" aria-labelledby="cta-title">
      <div
        class="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/15 blur-[130px]"
        aria-hidden="true"
      />

      <div class="relative z-10 container mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 id="cta-title" class="text-3xl font-bold text-fg sm:text-4xl">
          Vamos construir algo <span class="text-gradient-accent">juntos</span>?
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-fg-muted">
          Estou aberto a oportunidades, freelas e colaborações. Me chama que eu respondo
          rápido.
        </p>

        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            :href="WHATSAPP_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/40"
          >
            <i class="bx bxl-whatsapp text-xl" aria-hidden="true" />
            Chamar no WhatsApp
          </a>
          <a
            :href="`mailto:${CONTACT.email}`"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-3.5 font-semibold text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
          >
            <i class="bx bx-envelope text-xl" aria-hidden="true" />
            Enviar e-mail
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Typed from 'typed.js'

const {
  contato: CONTACT,
  perfil,
  linksSociais: SOCIAL_LINKS,
  whatsappUrl: WHATSAPP_URL,
} = useConteudo()

useSeoMeta({
  title: 'Desenvolvedor Frontend',
  description:
    'Weslley Renan Mattos, desenvolvedor frontend em Santa Catarina. Crio interfaces modernas, responsivas e performáticas com Vue, Nuxt e Tailwind CSS.',
  ogTitle: () => `${CONTACT.value.name} — ${CONTACT.value.role}`,
})

const stack = [
  { name: 'Vue', icon: 'bx bxl-vuejs', color: '#42b883' },
  { name: 'Nuxt', iconify: 'i-simple-icons-nuxt', color: '#00dc82' },
  { name: 'JavaScript', icon: 'bx bxl-javascript', color: '#f7df1e' },
  { name: 'TypeScript', icon: 'bx bxl-typescript', color: '#3178c6' },
  { name: 'Tailwind CSS', icon: 'bx bxl-tailwind-css', color: '#38bdf8' },
  { name: 'HTML5', icon: 'bx bxl-html5', color: '#e34f26' },
  { name: 'CSS3', icon: 'bx bxl-css3', color: '#1572b6' },
  { name: 'Node.js', icon: 'bx bxl-nodejs', color: '#8cc84b' },
  { name: 'Git', icon: 'bx bxl-git', color: '#f05032' },
  { name: 'Docker', icon: 'bx bxl-docker', color: '#2496ed' },
  { name: 'Claude', iconify: 'i-simple-icons-claude', color: '#d97757' },
  { name: 'Cursor', iconify: 'i-simple-icons-cursor', color: '#e8edf7' },
  { name: 'ChatGPT', iconify: 'i-simple-icons-openai', color: '#10a37f' },
]

const typedTarget = ref(null)
let typedInstance = null

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    if (typedTarget.value) typedTarget.value.textContent = 'Desenvolvedor Frontend'
    return
  }

  typedInstance = new Typed(typedTarget.value, {
    strings: [
      'Desenvolvedor Frontend',
      'Web Developer',
      'JavaScript Dev',
      'Full Stack in progress',
    ],
    typeSpeed: 70,
    backSpeed: 45,
    backDelay: 1500,
    loop: true,
  })
})

onBeforeUnmount(() => {
  typedInstance?.destroy()
})
</script>
