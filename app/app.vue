<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { CONTACT } from '~/data/contact'

const { siteUrl } = useRuntimeConfig().public

/* Metadados padrão — cada página sobrescreve o que precisar */
useSeoMeta({
  titleTemplate: (title) => (title ? `${title} | ${CONTACT.shortName}` : CONTACT.name),
  description:
    'Portfólio de Weslley Renan Mattos, desenvolvedor frontend especializado em Vue, Nuxt e Tailwind CSS. Interfaces modernas, responsivas e performáticas.',
  ogSiteName: CONTACT.name,
  ogType: 'website',
  ogLocale: 'pt_BR',
  // TODO: trocar por uma arte 1200x630 dedicada (og-image.png) quando houver
  ogImage: `${siteUrl}/eu.png`,
  ogImageAlt: `${CONTACT.name} — ${CONTACT.role}`,
  twitterCard: 'summary_large_image',
  twitterImage: `${siteUrl}/eu.png`,
  author: CONTACT.name,
})

/* Dados estruturados para o Google entender quem é o dono do site */
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: CONTACT.name,
        alternateName: CONTACT.shortName,
        jobTitle: CONTACT.role,
        email: `mailto:${CONTACT.email}`,
        url: siteUrl,
        image: `${siteUrl}/eu.png`,
        sameAs: [CONTACT.github, CONTACT.linkedin],
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'SC',
          addressCountry: 'BR',
        },
        knowsAbout: [
          'Vue.js',
          'Nuxt',
          'Tailwind CSS',
          'JavaScript',
          'TypeScript',
          'Desenvolvimento Frontend',
        ],
      }),
    },
  ],
})
</script>
