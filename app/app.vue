<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { computed } from 'vue'

const { siteUrl } = useRuntimeConfig().public
const { contato, perfil } = useConteudo()

/* A foto de perfil vira a imagem de compartilhamento — trocar a foto no
   painel atualiza também o preview no WhatsApp e no LinkedIn. */
const imagemSocial = computed(() => `${siteUrl}${perfil.value.fotoPerfil}`)

/* Metadados padrão — cada página sobrescreve o que precisar.
   Tudo em forma de função para acompanhar as edições do painel. */
useSeoMeta({
  titleTemplate: (title) =>
    title ? `${title} | ${contato.value.shortName}` : contato.value.name,
  description:
    'Portfólio de Weslley Renan Mattos, desenvolvedor frontend especializado em Vue, Nuxt e Tailwind CSS. Interfaces modernas, responsivas e performáticas.',
  ogSiteName: () => contato.value.name,
  ogType: 'website',
  ogLocale: 'pt_BR',
  ogImage: () => imagemSocial.value,
  ogImageAlt: () => `${contato.value.name} — ${contato.value.role}`,
  twitterCard: 'summary_large_image',
  twitterImage: () => imagemSocial.value,
  author: () => contato.value.name,
})

/* Dados estruturados para o Google entender quem é o dono do site */
const dadosEstruturados = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: contato.value.name,
    alternateName: contato.value.shortName,
    jobTitle: contato.value.role,
    email: `mailto:${contato.value.email}`,
    url: siteUrl,
    image: imagemSocial.value,
    sameAs: [contato.value.github, contato.value.linkedin],
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
)

useHead({
  script: [{ type: 'application/ld+json', innerHTML: dadosEstruturados }],
})
</script>
