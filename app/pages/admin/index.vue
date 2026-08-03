<template>
  <div>
    <header class="mb-8">
      <h1 class="text-2xl font-bold text-fg">Métricas</h1>
      <p class="mt-1 text-sm text-fg-subtle">
        Acessos e downloads do currículo desde que o painel entrou no ar.
      </p>
    </header>

    <div v-if="carregando" class="cartao-admin text-sm text-fg-muted">Carregando…</div>

    <template v-else-if="dados">
      <!-- Totais -->
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="cartao-admin">
          <p class="text-xs font-semibold tracking-[0.15em] text-fg-subtle uppercase">
            Visualizações
          </p>
          <p class="mt-2 text-3xl font-extrabold text-fg">
            {{ formatar(dados.totais.visualizacoes) }}
          </p>
          <p class="mt-1 text-xs text-fg-subtle">Total de páginas abertas</p>
        </div>

        <div class="cartao-admin">
          <p class="text-xs font-semibold tracking-[0.15em] text-fg-subtle uppercase">
            Visitantes
          </p>
          <p class="mt-2 text-3xl font-extrabold text-accent-400">
            {{ formatar(dados.totais.visitantes) }}
          </p>
          <p class="mt-1 text-xs text-fg-subtle">Navegadores distintos</p>
        </div>

        <div class="cartao-admin">
          <p class="text-xs font-semibold tracking-[0.15em] text-fg-subtle uppercase">
            Downloads
          </p>
          <p class="mt-2 text-3xl font-extrabold text-glow-400">
            {{ formatar(dados.totais.downloads) }}
          </p>
          <p class="mt-1 text-xs text-fg-subtle">Currículo em PDF</p>
        </div>
      </div>

      <!-- Série diária -->
      <section class="cartao-admin mt-6">
        <div class="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="font-bold text-fg">Últimos 30 dias</h2>
          <div class="flex items-center gap-4 text-xs text-fg-subtle">
            <span class="flex items-center gap-1.5">
              <span class="h-2.5 w-2.5 rounded-sm bg-accent-500" aria-hidden="true" />
              Visitas
            </span>
            <span class="flex items-center gap-1.5">
              <span class="h-2.5 w-2.5 rounded-sm bg-glow-500" aria-hidden="true" />
              Downloads
            </span>
          </div>
        </div>

        <div
          v-if="totalPeriodo === 0"
          class="py-10 text-center text-sm text-fg-subtle"
        >
          Nenhum acesso registrado ainda neste período.
        </div>

        <div v-else class="flex h-44 items-stretch gap-[3px]">
          <div
            v-for="dia in dados.serie"
            :key="dia.dia"
            class="group relative flex h-full flex-1 flex-col justify-end gap-[2px]"
            :title="`${formatarDia(dia.dia)} — ${dia.visitas} visita(s), ${dia.downloads} download(s)`"
          >
            <div
              v-if="dia.downloads > 0"
              class="w-full rounded-t-sm bg-glow-500/80"
              :style="{ height: `${altura(dia.downloads)}%` }"
            />
            <div
              v-if="dia.visitas > 0"
              class="w-full rounded-t-sm bg-accent-500/80 transition-colors group-hover:bg-accent-400"
              :style="{ height: `${altura(dia.visitas)}%` }"
            />
          </div>
        </div>

        <div class="mt-3 flex justify-between text-[0.7rem] text-fg-subtle">
          <span>{{ formatarDia(dados.serie[0]?.dia) }}</span>
          <span>{{ formatarDia(dados.serie[dados.serie.length - 1]?.dia) }}</span>
        </div>
      </section>

      <p class="mt-4 text-xs text-fg-subtle">
        Acessos ao próprio painel não são contabilizados.
      </p>
    </template>

    <p v-else class="cartao-admin text-sm text-red-400">{{ erro }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useSeoMeta({ title: 'Métricas', robots: 'noindex, nofollow' })

const { carregarMetricas } = useAdminApi()

const dados = ref(null)
const carregando = ref(true)
const erro = ref('')

/* A barra mais alta do período vira 100%; assim a escala se adapta
   tanto a 3 acessos quanto a 3 mil. */
const maximo = computed(() => {
  if (!dados.value) return 1
  return Math.max(1, ...dados.value.serie.map((d) => d.visitas + d.downloads))
})

const totalPeriodo = computed(() =>
  dados.value ? dados.value.serie.reduce((s, d) => s + d.visitas + d.downloads, 0) : 0,
)

/* Barras com 1 ou 2 acessos num período de pico alto sumiriam; o piso de 3%
   garante que qualquer dia com movimento apareça. */
const altura = (valor) => (valor > 0 ? Math.max(3, (valor / maximo.value) * 100) : 0)

const formatar = (n) => new Intl.NumberFormat('pt-BR').format(n ?? 0)

const formatarDia = (iso) => {
  if (!iso) return ''
  const [, mes, dia] = iso.split('-')
  return `${dia}/${mes}`
}

onMounted(async () => {
  try {
    dados.value = await carregarMetricas()
  } catch (e) {
    erro.value = mensagemDeErro(e)
  } finally {
    carregando.value = false
  }
})
</script>
