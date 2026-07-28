<template>
  <div class="cv-page">
    <!-- Barra de ações — não aparece na impressão -->
    <div class="no-print sticky top-0 z-30 border-b border-white/10 bg-ink-900/95 backdrop-blur">
      <div
        class="container mx-auto flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
      >
        <NuxtLink
          to="/sobre"
          class="inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
        >
          <i class="bx bx-arrow-back text-lg" aria-hidden="true" />
          Voltar
        </NuxtLink>

        <div class="flex flex-wrap items-center gap-2.5">
          <a
            v-if="RESUME.available"
            :href="RESUME.path"
            :download="RESUME.fileName"
            class="inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-400"
          >
            <i class="bx bx-download text-lg" aria-hidden="true" />
            Baixar PDF
          </a>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-white/5"
            @click="print"
          >
            <i class="bx bx-printer text-lg" aria-hidden="true" />
            Imprimir
          </button>
        </div>
      </div>
    </div>

    <!-- Folha A4 -->
    <div class="cv-sheet">
      <!-- Cabeçalho -->
      <header class="cv-header">
        <div>
          <h1 class="cv-name">{{ CONTACT.name }}</h1>
          <p class="cv-role">{{ CONTACT.role }} · {{ CONTACT.headline }}</p>
        </div>

        <ul class="cv-contact">
          <li>{{ CONTACT.location }}</li>
          <li>{{ CONTACT.phoneDisplay }}</li>
          <li>
            <a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a>
          </li>
          <li>
            <a :href="CONTACT.linkedin" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/weslley-mattos
            </a>
          </li>
          <li>
            <a :href="`https://${CONTACT.site}`" target="_blank" rel="noopener noreferrer">
              {{ CONTACT.site }}
            </a>
          </li>
        </ul>
      </header>

      <!-- Resumo -->
      <section class="cv-section">
        <h2 class="cv-section-title">Resumo profissional</h2>
        <p class="cv-summary">{{ SUMMARY }}</p>
      </section>

      <!-- Experiência -->
      <section class="cv-section">
        <h2 class="cv-section-title">Experiência profissional</h2>

        <article v-for="item in experience" :key="`${item.company}-${item.role}`" class="cv-item">
          <div class="cv-item-head">
            <h3 class="cv-item-role">
              {{ item.role }}
              <span class="cv-item-company">· {{ item.company }}</span>
            </h3>
            <span class="cv-item-period">{{ item.period }}</span>
          </div>

          <ul class="cv-bullets">
            <li v-for="highlight in item.highlights" :key="highlight">{{ highlight }}</li>
          </ul>
        </article>
      </section>

      <!-- Competências -->
      <section class="cv-section">
        <h2 class="cv-section-title">Competências técnicas</h2>

        <dl class="cv-skills">
          <div v-for="group in skillGroups" :key="group.label" class="cv-skill-row">
            <dt>{{ group.label }}</dt>
            <dd>{{ group.items.join(' · ') }}</dd>
          </div>
          <div class="cv-skill-row">
            <dt>Soft skills</dt>
            <dd>
              Atendimento ao cliente · Comunicação · Trabalho em equipe · Resolução de
              problemas · Aprendizado rápido
            </dd>
          </div>
        </dl>
      </section>

      <!-- Formação -->
      <section class="cv-section">
        <h2 class="cv-section-title">Formação e certificações</h2>

        <div v-for="item in education" :key="item.course" class="cv-item-head cv-education">
          <h3 class="cv-item-role">
            {{ item.course }}
            <span v-if="item.institution" class="cv-item-company">
              · {{ item.institution }}
            </span>
          </h3>
          <span class="cv-item-period">{{ item.period }}</span>
        </div>

        <div v-for="item in certifications" :key="item.name" class="cv-item-head cv-education">
          <h3 class="cv-item-role">
            {{ item.name }}
            <span class="cv-item-company">· {{ item.issuer }}</span>
          </h3>
          <span class="cv-item-period">{{ item.year }}</span>
        </div>
      </section>

      <!-- Idiomas -->
      <section class="cv-section cv-section-last">
        <h2 class="cv-section-title">Idiomas</h2>
        <p class="cv-summary">
          <span v-for="(language, i) in languages" :key="language.label">
            <strong>{{ language.label }}</strong> — {{ language.level
            }}<span v-if="i < languages.length - 1"> · </span>
          </span>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { CONTACT } from '~/data/contact'
import {
  certifications,
  education,
  experience,
  languages,
  RESUME,
  skillGroups,
  SUMMARY,
} from '~/data/profile'

definePageMeta({ layout: false })

useSeoMeta({
  title: `Currículo — ${CONTACT.name}`,
  description: `Currículo de ${CONTACT.name}, ${CONTACT.role}. Experiência, competências técnicas e formação.`,
  robots: 'noindex',
})

const print = () => window.print()
</script>

<style scoped>
/* ============================================================
   Tela — a folha aparece centralizada sobre o fundo escuro
   ============================================================ */
.cv-page {
  min-height: 100vh;
  background-color: var(--color-ink-950);
  padding-bottom: 3rem;
}

.cv-sheet {
  margin: 2.5rem auto;
  width: 100%;
  max-width: 210mm;
  background: #fff;
  color: #1a1a1a;
  padding: 14mm 14mm;
  box-shadow: 0 25px 60px -20px rgb(0 0 0 / 0.8);
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 9.4pt;
  line-height: 1.4;
}

/* Cabeçalho */
.cv-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  border-bottom: 2px solid #f97316;
  padding-bottom: 0.9rem;
}

.cv-name {
  font-size: 21pt;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #0f172a;
}

.cv-role {
  margin-top: 0.15rem;
  font-size: 10.5pt;
  font-weight: 600;
  color: #ea580c;
}

.cv-contact {
  text-align: right;
  font-size: 8.7pt;
  color: #475569;
  line-height: 1.65;
}

.cv-contact a {
  color: #475569;
  text-decoration: none;
}

/* Seções */
.cv-section {
  margin-top: 0.85rem;
}

.cv-section-last {
  margin-bottom: 0;
}

.cv-section-title {
  margin-bottom: 0.55rem;
  font-size: 9pt;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #0f172a;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.2rem;
}

.cv-summary {
  text-align: justify;
  color: #334155;
}

/* Itens de experiência */
.cv-item {
  margin-bottom: 0.6rem;
  /* Evita que um cargo seja partido entre duas páginas */
  break-inside: avoid;
}

.cv-item:last-child {
  margin-bottom: 0;
}

.cv-item-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1rem;
}

.cv-item-role {
  font-size: 10.8pt;
  font-weight: 700;
  color: #0f172a;
}

.cv-item-company {
  font-weight: 500;
  color: #475569;
}

.cv-item-period {
  font-size: 8.5pt;
  font-weight: 600;
  color: #ea580c;
  white-space: nowrap;
}

.cv-bullets {
  margin-top: 0.3rem;
  padding-left: 1.05rem;
  list-style: disc;
  color: #334155;
}

.cv-bullets li {
  margin-bottom: 0.13rem;
}

.cv-education {
  margin-bottom: 0.4rem;
  break-inside: avoid;
}

/* Competências */
.cv-skills {
  display: grid;
  gap: 0.3rem;
}

.cv-skill-row {
  display: grid;
  grid-template-columns: 8.5rem 1fr;
  gap: 0.5rem;
  break-inside: avoid;
}

.cv-skill-row dt {
  font-weight: 700;
  color: #0f172a;
}

.cv-skill-row dd {
  color: #334155;
}

@media (max-width: 640px) {
  .cv-sheet {
    padding: 10mm 7mm;
    font-size: 10pt;
  }

  .cv-contact {
    text-align: left;
  }

  .cv-skill-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

/* ============================================================
   Impressão / geração do PDF
   ============================================================ */
@media print {
  .no-print {
    display: none !important;
  }

  .cv-page {
    background: #fff;
    padding: 0 !important;
    min-height: 0 !important;
  }

  /* A folha mantém o próprio padding: ele vira a margem da página impressa,
     por isso o PDF é gerado com margin 0. */
  .cv-sheet {
    margin: 0 !important;
    max-width: none;
    width: 100%;
    box-shadow: none;
  }
}
</style>
