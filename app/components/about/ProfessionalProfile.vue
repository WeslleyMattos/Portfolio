<template>
  <div class="space-y-16">
    <!-- ===== Cartão de apresentação ===== -->
    <section class="surface-glass overflow-hidden rounded-card" aria-labelledby="perfil-title">
      <div class="grid gap-8 p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-start">
        <div class="mx-auto lg:mx-0">
          <ProfileImg src="/eu.png" :alt="`Foto de ${CONTACT.name}`" size="sm" />
        </div>

        <div class="text-center lg:text-left">
          <h1 id="perfil-title" class="text-3xl font-extrabold text-fg sm:text-4xl">
            {{ CONTACT.name }}
          </h1>

          <p class="mt-2 text-lg font-semibold text-accent-400">
            {{ CONTACT.role }}
            <span class="text-fg-subtle">·</span>
            <span class="text-fg-muted">{{ CONTACT.headline }}</span>
          </p>

          <p class="mt-4 leading-relaxed text-fg-muted">
            {{ SUMMARY }}
          </p>

          <!-- Chips de contato -->
          <ul class="mt-6 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            <li class="info-chip">
              <i class="bx bx-map" aria-hidden="true" />
              {{ CONTACT.location }}
            </li>
            <li>
              <a :href="`mailto:${CONTACT.email}`" class="info-chip info-chip-link">
                <i class="bx bx-envelope" aria-hidden="true" />
                {{ CONTACT.email }}
              </a>
            </li>
            <li>
              <a
                :href="CONTACT.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="info-chip info-chip-link"
              >
                <i class="bx bxl-linkedin" aria-hidden="true" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                :href="CONTACT.github"
                target="_blank"
                rel="noopener noreferrer"
                class="info-chip info-chip-link"
              >
                <i class="bx bxl-github" aria-hidden="true" />
                GitHub
              </a>
            </li>
          </ul>

          <!-- Ações -->
          <div class="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              v-if="RESUME.available"
              :href="RESUME.path"
              :download="RESUME.fileName"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/40"
            >
              <i class="bx bx-download text-lg" aria-hidden="true" />
              Baixar currículo
            </a>

            <a
              :href="WHATSAPP_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-7 py-3 font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fb855] hover:shadow-xl hover:shadow-[#25d366]/35"
            >
              <i class="bx bxl-whatsapp text-xl" aria-hidden="true" />
              Falar comigo
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Experiência ===== -->
    <section v-if="experience.length" aria-labelledby="experience-title">
      <AboutSectionTitle id="experience-title" icon="bx bx-briefcase">
        Experiência
      </AboutSectionTitle>

      <ol class="mt-8 space-y-5 border-l border-white/10 pl-6 sm:pl-8">
        <li v-for="item in experience" :key="`${item.company}-${item.role}`" class="relative">
          <span
            class="absolute top-6 -left-[1.72rem] h-3 w-3 rounded-full border-2 border-ink-950 sm:-left-[2.22rem]"
            :class="item.current ? 'bg-accent-500' : 'bg-ink-600'"
            aria-hidden="true"
          />

          <div class="rounded-card border border-white/8 bg-ink-850 p-6">
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <h3 class="text-lg font-bold text-fg">{{ item.role }}</h3>
              <p class="text-xs font-semibold tracking-wide text-accent-400 uppercase">
                {{ item.period }}
              </p>
            </div>

            <p class="mt-1 text-sm font-medium text-fg-muted">{{ item.company }}</p>

            <ul class="mt-4 space-y-2">
              <li
                v-for="highlight in item.highlights"
                :key="highlight"
                class="flex gap-2.5 text-sm leading-relaxed text-fg-muted"
              >
                <i
                  class="bx bx-chevron-right mt-0.5 shrink-0 text-accent-400"
                  aria-hidden="true"
                />
                <span>{{ highlight }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </section>

    <!-- ===== Competências ===== -->
    <section aria-labelledby="skills-title">
      <AboutSectionTitle id="skills-title" icon="bx bx-bar-chart-alt-2">
        Competências
      </AboutSectionTitle>

      <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <div class="rounded-card border border-white/8 bg-ink-850 p-7">
          <h3 class="mb-6 text-sm font-semibold tracking-[0.15em] text-fg-subtle uppercase">
            Técnicas
          </h3>
          <div class="space-y-5">
            <div v-for="stat in techStats" :key="stat.label">
              <div class="mb-2 flex items-baseline justify-between text-sm">
                <span class="font-medium text-fg">{{ stat.label }}</span>
                <span class="font-semibold text-accent-400">
                  {{ toPercent(stat.value) }}%
                </span>
              </div>
              <div
                class="h-2 w-full overflow-hidden rounded-full bg-ink-700"
                role="meter"
                :aria-valuenow="toPercent(stat.value)"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-label="`Nível em ${stat.label}`"
              >
                <div
                  class="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-300 transition-[width] duration-1000 ease-out"
                  :style="{ width: mounted ? `${toPercent(stat.value)}%` : '0%' }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-card border border-white/8 bg-ink-850 p-7">
          <h3 class="mb-6 text-sm font-semibold tracking-[0.15em] text-fg-subtle uppercase">
            Comportamentais
          </h3>
          <div class="space-y-5">
            <div v-for="stat in softStats" :key="stat.label">
              <div class="mb-2 flex items-baseline justify-between text-sm">
                <span class="font-medium text-fg">{{ stat.label }}</span>
                <span class="font-semibold text-glow-400">
                  {{ toPercent(stat.value) }}%
                </span>
              </div>
              <div
                class="h-2 w-full overflow-hidden rounded-full bg-ink-700"
                role="meter"
                :aria-valuenow="toPercent(stat.value)"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-label="`Nível em ${stat.label}`"
              >
                <div
                  class="h-full rounded-full bg-gradient-to-r from-glow-500 to-glow-300 transition-[width] duration-1000 ease-out"
                  :style="{ width: mounted ? `${toPercent(stat.value)}%` : '0%' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Stack ===== -->
    <section aria-labelledby="stack-title">
      <AboutSectionTitle id="stack-title" icon="bx bx-code-block">
        Stack
      </AboutSectionTitle>

      <div class="mt-8 grid gap-5 sm:grid-cols-2">
        <div
          v-for="group in skillGroups"
          :key="group.label"
          class="rounded-card border border-white/8 bg-ink-850 p-6"
        >
          <h3 class="text-sm font-semibold tracking-[0.15em] text-fg-subtle uppercase">
            {{ group.label }}
          </h3>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="item in group.items"
              :key="item"
              class="rounded-lg border border-glow-500/25 bg-glow-500/8 px-2.5 py-1 text-xs font-medium text-glow-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ===== Formação ===== -->
    <section v-if="education.length || certifications.length" aria-labelledby="education-title">
      <AboutSectionTitle id="education-title" icon="bx bx-book-open">
        Formação
      </AboutSectionTitle>

      <div class="mt-8 grid gap-5 sm:grid-cols-2">
        <article
          v-for="item in education"
          :key="`${item.institution}-${item.course}`"
          class="rounded-card border border-white/8 bg-ink-850 p-6"
        >
          <h3 class="font-bold text-fg">{{ item.course }}</h3>
          <p v-if="item.institution" class="mt-1 text-sm text-fg-muted">
            {{ item.institution }}
          </p>
          <p class="mt-3 text-xs font-semibold tracking-wide text-accent-400 uppercase">
            {{ item.period }}
          </p>
        </article>

        <article
          v-for="item in certifications"
          :key="item.name"
          class="rounded-card border border-white/8 bg-ink-850 p-6"
        >
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-glow-500/30 bg-glow-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-glow-300 uppercase"
          >
            <i class="bx bx-medal" aria-hidden="true" />
            Certificação
          </span>
          <h3 class="mt-3 font-bold text-fg">{{ item.name }}</h3>
          <p class="mt-1 text-sm text-fg-muted">{{ item.issuer }}</p>
          <p class="mt-3 text-xs font-semibold tracking-wide text-accent-400 uppercase">
            {{ item.year }}
          </p>
        </article>
      </div>
    </section>

    <!-- ===== Idiomas ===== -->
    <section v-if="languages.length" aria-labelledby="languages-title">
      <AboutSectionTitle id="languages-title" icon="bx bx-globe">
        Idiomas
      </AboutSectionTitle>

      <ul class="mt-8 flex flex-wrap gap-3">
        <li
          v-for="language in languages"
          :key="language.label"
          class="flex items-center gap-2 rounded-full border border-white/10 bg-ink-850 px-5 py-2.5 text-sm"
        >
          <span class="font-semibold text-fg">{{ language.label }}</span>
          <span class="text-fg-subtle">·</span>
          <span class="text-fg-muted">{{ language.level }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { CONTACT, WHATSAPP_URL } from '~/data/contact'
import {
  certifications,
  education,
  experience,
  languages,
  RESUME,
  skillGroups,
  softStats,
  SUMMARY,
  techStats,
  toPercent,
} from '~/data/profile'

/* As barras começam em zero e animam ao montar */
const mounted = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true
  })
})
</script>

<style scoped>
.info-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 9999px;
  border: 1px solid rgb(255 255 255 / 0.1);
  background-color: var(--color-ink-850);
  padding: 0.45rem 0.95rem;
  font-size: 0.8rem;
  color: var(--color-fg-muted);
}

.info-chip i {
  font-size: 1rem;
}

.info-chip-link {
  transition: all 0.25s ease;
}

.info-chip-link:hover {
  border-color: rgb(249 115 22 / 0.45);
  color: var(--color-accent-300);
}
</style>
