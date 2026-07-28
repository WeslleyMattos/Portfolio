<template>
  <div>
    <!-- Nota do desenvolvedor -->
    <div
      class="mx-auto mb-8 max-w-6xl rounded-card border border-purple-500/40 bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-purple-950/70 p-5 backdrop-blur-sm"
    >
      <div class="flex items-start gap-3">
        <span class="text-2xl" aria-hidden="true">✨</span>
        <div>
          <h2
            class="mb-1.5 text-xs font-bold tracking-[0.18em] text-purple-300 uppercase"
          >
            Nota do desenvolvedor
          </h2>
          <p class="text-sm leading-relaxed text-fg-muted">
            Esta versão é
            <span class="font-semibold text-accent-300">intencionalmente criativa</span>.
            Aqui eu transformo meu perfil profissional numa ficha de personagem de RPG
            para explorar componentes reutilizáveis, animações e um pouco de CSS 3D — o
            dado de 20 lados é interativo, pode clicar. 🎲
          </p>
        </div>
      </div>
    </div>

    <RpgCharacterCard>
      <!-- Atributos -->
      <div>
        <h2 class="mb-5 flex items-center gap-2 text-xl font-bold text-yellow-500">
          <span aria-hidden="true">⚔️</span> Atributos
        </h2>

        <RpgStatBar
          v-for="stat in allStats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
        />
      </div>

      <!-- Perícias -->
      <div>
        <h2 class="mb-5 flex items-center gap-2 text-xl font-bold text-yellow-500">
          <span aria-hidden="true">🎯</span> Perícias
        </h2>

        <RpgSkillItem title="Life Skills" :skills="lifeSkills" />
      </div>

      <!-- Equipamentos -->
      <div class="md:col-span-2">
        <h2 class="mb-5 flex items-center gap-2 text-xl font-bold text-yellow-500">
          <span aria-hidden="true">🛡️</span> Equipamentos
        </h2>

        <ul class="flex flex-wrap gap-2">
          <li v-for="item in setup" :key="item">
            <RpgEquipmentItem :name="item" />
          </li>
        </ul>
      </div>
    </RpgCharacterCard>
  </div>
</template>

<script setup>
import { lifeSkills, setup, softStats, techStats } from '~/data/profile'

/* Na ficha de RPG, técnicas e comportamentais aparecem juntas */
const allStats = [...techStats, ...softStats]
</script>
