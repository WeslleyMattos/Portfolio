<template>
  <div>
    <header class="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-fg">Currículo</h1>
        <p class="mt-1 text-sm text-fg-subtle">
          Experiência, competências e formação. Alimenta a página
          <NuxtLink to="/curriculo" target="_blank" class="text-accent-400 hover:underline">
            /curriculo
          </NuxtLink>
          e o modo profissional.
        </p>
      </div>
      <button class="botao-primario" :disabled="salvando || !perfil" @click="salvar">
        <i class="bx bx-save text-lg" aria-hidden="true" />
        {{ salvando ? 'Salvando…' : 'Salvar' }}
      </button>
    </header>

    <AdminAviso :erro="erro" :sucesso="sucesso" />

    <div v-if="!perfil" class="cartao-admin text-sm text-fg-muted">Carregando…</div>

    <div v-else class="space-y-6">
      <!-- PDF -->
      <section class="cartao-admin">
        <h2 class="mb-4 font-bold text-fg">Arquivo PDF</h2>

        <label class="flex cursor-pointer items-center gap-2 text-sm text-fg-muted">
          <input v-model="perfil.curriculo.disponivel" type="checkbox" class="accent-accent-500" />
          Mostrar o botão de download no site
        </label>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <input
            ref="inputPdf"
            type="file"
            accept="application/pdf"
            class="hidden"
            @change="enviarPdf"
          />
          <button
            type="button"
            class="botao-secundario"
            :disabled="enviandoPdf"
            @click="inputPdf?.click()"
          >
            <i class="bx bx-upload" aria-hidden="true" />
            {{ enviandoPdf ? 'Enviando…' : 'Enviar novo PDF' }}
          </button>

          <a href="/curriculo.pdf" target="_blank" rel="noopener" class="botao-secundario">
            <i class="bx bx-show" aria-hidden="true" />
            Ver o atual
          </a>
        </div>

        <p class="mt-3 text-xs text-fg-subtle">
          Arquivo atual: <code>{{ perfil.curriculo.arquivo }}</code>
        </p>
        <p class="mt-1 text-xs text-fg-subtle">
          Gere o PDF na sua máquina com <code>npm run curriculo</code> e envie aqui. Cuidado:
          abrir "Ver o atual" conta como um download nas métricas.
        </p>

        <div class="mt-4 max-w-sm">
          <label for="nome-arquivo" class="rotulo">Nome do arquivo ao baixar</label>
          <input
            id="nome-arquivo"
            v-model="perfil.curriculo.nomeArquivo"
            type="text"
            class="campo"
          />
        </div>
      </section>

      <!-- Competências -->
      <section class="cartao-admin">
        <h2 class="mb-1 font-bold text-fg">Competências</h2>
        <p class="mb-5 text-xs text-fg-subtle">
          Notas de 0 a 20 (escala da ficha de RPG). O modo profissional converte para
          porcentagem sozinho, então os dois modos nunca ficam desalinhados.
        </p>

        <div class="grid gap-6 lg:grid-cols-2">
          <div v-for="grupo in gruposStats" :key="grupo.chave">
            <h3 class="rotulo">{{ grupo.titulo }}</h3>
            <div class="space-y-2">
              <div v-for="(stat, i) in perfil[grupo.chave]" :key="i" class="flex gap-2">
                <!-- min-w-0: sem isso o input de texto não encolhe abaixo do
                     tamanho do conteúdo e empurra a linha para fora da coluna -->
                <input
                  v-model="stat.label"
                  type="text"
                  class="campo min-w-0 flex-1"
                  placeholder="Habilidade"
                />
                <input
                  v-model.number="stat.value"
                  type="number"
                  min="0"
                  max="20"
                  class="campo w-20 shrink-0"
                />
                <span class="w-12 shrink-0 self-center text-right text-xs text-fg-subtle">
                  {{ Math.round((stat.value / 20) * 100) }}%
                </span>
                <button
                  type="button"
                  class="shrink-0 rounded-lg px-2 text-fg-subtle hover:text-red-400"
                  aria-label="Remover competência"
                  @click="perfil[grupo.chave].splice(i, 1)"
                >
                  <i class="bx bx-trash" aria-hidden="true" />
                </button>
              </div>
            </div>
            <button
              type="button"
              class="mt-2 botao-secundario"
              @click="perfil[grupo.chave].push({ label: '', value: 10 })"
            >
              <i class="bx bx-plus" aria-hidden="true" />
              Adicionar
            </button>
          </div>
        </div>
      </section>

      <!-- Stack -->
      <section class="cartao-admin">
        <h2 class="mb-4 font-bold text-fg">Stack</h2>

        <div class="space-y-5">
          <div
            v-for="(grupo, i) in perfil.skillGroups"
            :key="i"
            class="rounded-xl border border-white/8 p-4"
          >
            <div class="mb-3 flex gap-2">
              <input
                v-model="grupo.label"
                type="text"
                class="campo"
                placeholder="Nome do grupo (ex: Frontend)"
              />
              <button
                type="button"
                class="shrink-0 rounded-lg px-3 text-fg-subtle hover:text-red-400"
                aria-label="Remover grupo"
                @click="perfil.skillGroups.splice(i, 1)"
              >
                <i class="bx bx-trash" aria-hidden="true" />
              </button>
            </div>
            <AdminListaTexto
              v-model="grupo.items"
              placeholder="Tecnologia"
              texto-adicionar="Adicionar tecnologia"
            />
          </div>
        </div>

        <button
          type="button"
          class="mt-4 botao-secundario"
          @click="perfil.skillGroups.push({ label: '', items: [] })"
        >
          <i class="bx bx-plus" aria-hidden="true" />
          Adicionar grupo
        </button>
      </section>

      <!-- Experiência -->
      <section class="cartao-admin">
        <h2 class="mb-4 font-bold text-fg">Experiência</h2>

        <div class="space-y-5">
          <article
            v-for="(item, i) in perfil.experiencia"
            :key="i"
            class="rounded-xl border border-white/8 p-4"
          >
            <div class="mb-3 flex items-start justify-between gap-2">
              <p class="text-xs font-semibold tracking-wide text-fg-subtle uppercase">
                Posição {{ i + 1 }}
              </p>
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  class="rounded-lg px-2 py-1 text-fg-subtle hover:text-fg disabled:opacity-30"
                  :disabled="i === 0"
                  aria-label="Mover para cima"
                  @click="mover(perfil.experiencia, i, -1)"
                >
                  <i class="bx bx-up-arrow-alt" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  class="rounded-lg px-2 py-1 text-fg-subtle hover:text-fg disabled:opacity-30"
                  :disabled="i === perfil.experiencia.length - 1"
                  aria-label="Mover para baixo"
                  @click="mover(perfil.experiencia, i, 1)"
                >
                  <i class="bx bx-down-arrow-alt" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  class="rounded-lg px-2 py-1 text-fg-subtle hover:text-red-400"
                  aria-label="Remover experiência"
                  @click="perfil.experiencia.splice(i, 1)"
                >
                  <i class="bx bx-trash" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <input v-model="item.role" type="text" class="campo" placeholder="Cargo" />
              <input v-model="item.company" type="text" class="campo" placeholder="Empresa" />
              <input
                v-model="item.period"
                type="text"
                class="campo"
                placeholder="2023 — Presente"
              />
            </div>

            <label class="mt-3 flex cursor-pointer items-center gap-2 text-sm text-fg-muted">
              <input v-model="item.current" type="checkbox" class="accent-accent-500" />
              Emprego atual
            </label>

            <div class="mt-4">
              <AdminListaTexto
                v-model="item.highlights"
                rotulo="Destaques"
                placeholder="O que você fez nessa posição"
                texto-adicionar="Adicionar destaque"
              />
            </div>
          </article>
        </div>

        <button type="button" class="mt-4 botao-secundario" @click="adicionarExperiencia">
          <i class="bx bx-plus" aria-hidden="true" />
          Adicionar experiência
        </button>
      </section>

      <!-- Formação e certificações -->
      <section class="cartao-admin">
        <h2 class="mb-4 font-bold text-fg">Formação</h2>

        <div class="space-y-3">
          <div v-for="(item, i) in perfil.formacao" :key="i" class="flex flex-wrap gap-2">
            <input v-model="item.course" type="text" class="campo flex-1" placeholder="Curso" />
            <input
              v-model="item.institution"
              type="text"
              class="campo flex-1"
              placeholder="Instituição"
            />
            <input v-model="item.period" type="text" class="campo w-40" placeholder="Período" />
            <button
              type="button"
              class="rounded-lg px-3 text-fg-subtle hover:text-red-400"
              aria-label="Remover formação"
              @click="perfil.formacao.splice(i, 1)"
            >
              <i class="bx bx-trash" aria-hidden="true" />
            </button>
          </div>
        </div>

        <button
          type="button"
          class="mt-3 botao-secundario"
          @click="perfil.formacao.push({ course: '', institution: '', period: '' })"
        >
          <i class="bx bx-plus" aria-hidden="true" />
          Adicionar formação
        </button>

        <h2 class="mt-8 mb-4 font-bold text-fg">Certificações</h2>

        <div class="space-y-3">
          <div v-for="(item, i) in perfil.certificacoes" :key="i" class="flex flex-wrap gap-2">
            <input v-model="item.name" type="text" class="campo flex-1" placeholder="Nome" />
            <input v-model="item.issuer" type="text" class="campo flex-1" placeholder="Emissor" />
            <input v-model="item.year" type="text" class="campo w-40" placeholder="Ano" />
            <button
              type="button"
              class="rounded-lg px-3 text-fg-subtle hover:text-red-400"
              aria-label="Remover certificação"
              @click="perfil.certificacoes.splice(i, 1)"
            >
              <i class="bx bx-trash" aria-hidden="true" />
            </button>
          </div>
        </div>

        <button
          type="button"
          class="mt-3 botao-secundario"
          @click="perfil.certificacoes.push({ name: '', issuer: '', year: '' })"
        >
          <i class="bx bx-plus" aria-hidden="true" />
          Adicionar certificação
        </button>
      </section>

      <!-- Idiomas -->
      <section class="cartao-admin">
        <h2 class="mb-4 font-bold text-fg">Idiomas</h2>

        <div class="space-y-3">
          <div v-for="(item, i) in perfil.idiomas" :key="i" class="flex gap-2">
            <input v-model="item.label" type="text" class="campo" placeholder="Idioma" />
            <input v-model="item.level" type="text" class="campo" placeholder="Nível" />
            <button
              type="button"
              class="rounded-lg px-3 text-fg-subtle hover:text-red-400"
              aria-label="Remover idioma"
              @click="perfil.idiomas.splice(i, 1)"
            >
              <i class="bx bx-trash" aria-hidden="true" />
            </button>
          </div>
        </div>

        <button
          type="button"
          class="mt-3 botao-secundario"
          @click="perfil.idiomas.push({ label: '', level: '' })"
        >
          <i class="bx bx-plus" aria-hidden="true" />
          Adicionar idioma
        </button>
      </section>

      <div class="flex justify-end pb-4">
        <button class="botao-primario" :disabled="salvando" @click="salvar">
          <i class="bx bx-save text-lg" aria-hidden="true" />
          {{ salvando ? 'Salvando…' : 'Salvar tudo' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useSeoMeta({ title: 'Currículo', robots: 'noindex, nofollow' })

const { carregarPerfil, salvarPerfil, enviarArquivo } = useAdminApi()

const perfil = ref(null)
const salvando = ref(false)
const enviandoPdf = ref(false)
const erro = ref('')
const sucesso = ref('')
const inputPdf = ref(null)

const gruposStats = [
  { chave: 'techStats', titulo: 'Técnicas' },
  { chave: 'softStats', titulo: 'Comportamentais' },
]

onMounted(async () => {
  try {
    perfil.value = await carregarPerfil()
  } catch (e) {
    erro.value = mensagemDeErro(e)
  }
})

const mover = (lista, indice, direcao) => {
  const destino = indice + direcao
  if (destino < 0 || destino >= lista.length) return
  const [item] = lista.splice(indice, 1)
  lista.splice(destino, 0, item)
}

const adicionarExperiencia = () => {
  perfil.value.experiencia.unshift({
    role: '',
    company: '',
    period: '',
    current: false,
    highlights: [''],
  })
}

const enviarPdf = async (evento) => {
  const arquivo = evento.target.files?.[0]
  if (!arquivo) return

  erro.value = ''
  enviandoPdf.value = true
  try {
    const { caminho } = await enviarArquivo(arquivo)
    perfil.value.curriculo.arquivo = caminho
    await salvarPerfil({ curriculo: { ...perfil.value.curriculo, arquivo: caminho } })
    sucesso.value = 'PDF enviado e publicado.'
  } catch (e) {
    erro.value = mensagemDeErro(e)
  } finally {
    enviandoPdf.value = false
    evento.target.value = ''
  }
}

const salvar = async () => {
  erro.value = ''
  sucesso.value = ''
  salvando.value = true
  try {
    perfil.value = await salvarPerfil(perfil.value)
    sucesso.value = 'Currículo salvo. O site já está mostrando as alterações.'
  } catch (e) {
    erro.value = mensagemDeErro(e)
  } finally {
    salvando.value = false
  }
}
</script>
