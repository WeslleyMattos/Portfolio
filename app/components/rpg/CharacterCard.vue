<template>
  <div class="mx-auto max-w-6xl">
    <div
      class="rounded-card border border-yellow-700/40 bg-gradient-to-br from-[#2a2420] via-[#1e1b18] to-[#1a1715] p-6 text-gray-200 shadow-2xl sm:p-8"
    >
      <!-- Cabeçalho da ficha -->
      <div
        class="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
      >
        <div class="order-2 flex-1 md:order-1">
          <h1
            class="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
          >
            {{ CONTACT.shortName }}
          </h1>
          <p class="mt-2 text-base font-semibold text-gray-300">
            🗡️ Classe: Frontend Arcano • 👤 Raça: Humano
          </p>
          <p class="mt-1 text-sm text-gray-400">
            Desenvolvedor especializado em Vue, Nuxt e Tailwind CSS
          </p>
        </div>

        <!-- Retrato -->
        <div
          class="relative order-1 mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-xl border-2 border-yellow-600 bg-gradient-to-br from-yellow-700 to-orange-800 shadow-lg md:order-2 md:mx-0 md:h-48 md:w-48"
        >
          <NuxtImg
            src="/mago2.png"
            :alt="`Ilustração de ${CONTACT.shortName} como personagem de RPG`"
            width="192"
            height="192"
            format="webp"
            quality="82"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div class="order-3">
          <RpgDice />
        </div>
      </div>

      <div
        class="mb-8 h-px bg-gradient-to-r from-yellow-700 via-orange-600 to-transparent"
      />

      <div class="grid gap-8 md:grid-cols-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { CONTACT } from '~/data/contact'
</script>
