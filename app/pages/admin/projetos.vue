<template>
  <div>
    <header class="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-fg">Projetos</h1>
        <p class="mt-1 text-sm text-fg-subtle">
          A ordem aqui é a ordem da grade em <code>/projetos</code>.
        </p>
      </div>
      <div class="flex gap-2">
        <button class="botao-secundario" :disabled="!projetos" @click="adicionar">
          <i class="bx bx-plus" aria-hidden="true" />
          Novo projeto
        </button>
        <button class="botao-primario" :disabled="salvando || !projetos" @click="salvar">
          <i class="bx bx-save text-lg" aria-hidden="true" />
          {{ salvando ? 'Salvando…' : 'Salvar' }}
        </button>
      </div>
    </header>

    <AdminAviso :erro="erro" :sucesso="sucesso" />

    <div v-if="!projetos" class="cartao-admin text-sm text-fg-muted">Carregando…</div>

    <div v-else-if="!projetos.length" class="cartao-admin text-center text-sm text-fg-muted">
      Nenhum projeto ainda. Clique em "Novo projeto" para começar.
    </div>

    <div v-else class="space-y-5">
      <article
        v-for="(projeto, i) in projetos"
        :key="projeto.id"
        class="cartao-admin"
      >
        <div class="mb-4 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h2 class="truncate font-bold text-fg">
              {{ projeto.title || 'Projeto sem título' }}
            </h2>
            <p class="mt-0.5 truncate text-xs text-fg-subtle">/{{ projeto.slug }}</p>
          </div>

          <div class="flex shrink-0 items-center gap-1">
            <button
              type="button"
              class="rounded-lg px-2 py-1 text-fg-subtle hover:text-fg disabled:opacity-30"
              :disabled="i === 0"
              aria-label="Mover para cima"
              @click="mover(i, -1)"
            >
              <i class="bx bx-up-arrow-alt" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="rounded-lg px-2 py-1 text-fg-subtle hover:text-fg disabled:opacity-30"
              :disabled="i === projetos.length - 1"
              aria-label="Mover para baixo"
              @click="mover(i, 1)"
            >
              <i class="bx bx-down-arrow-alt" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="rounded-lg px-2 py-1 text-fg-subtle hover:text-red-400"
              aria-label="Remover projeto"
              @click="remover(i)"
            >
              <i class="bx bx-trash" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div>
            <label class="rotulo">Título</label>
            <input v-model="projeto.title" type="text" class="campo" />
          </div>
          <div>
            <label class="rotulo">Categoria</label>
            <input
              v-model="projeto.category"
              type="text"
              class="campo"
              placeholder="Dashboard, Landing page…"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="rotulo">Frase de destaque</label>
            <input
              v-model="projeto.tagline"
              type="text"
              class="campo"
              placeholder="Uma linha que aparece no topo do card"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="rotulo">Descrição</label>
            <textarea v-model="projeto.description" class="campo" rows="3" />
          </div>
          <div class="sm:col-span-2">
            <label class="rotulo">Link do projeto no ar (opcional)</label>
            <input
              v-model="projeto.url"
              type="url"
              class="campo"
              placeholder="https://exemplo.com.br"
            />
          </div>
        </div>

        <label class="mt-4 flex cursor-pointer items-center gap-2 text-sm text-fg-muted">
          <input v-model="projeto.featured" type="checkbox" class="accent-accent-500" />
          Destaque — ocupa o dobro de espaço na grade
        </label>

        <!-- Imagens -->
        <div class="mt-5">
          <span class="rotulo">Imagens</span>

          <div v-if="projeto.images.length" class="mb-3 flex flex-wrap gap-3">
            <div v-for="(img, j) in projeto.images" :key="j" class="group relative">
              <img
                :src="img"
                :alt="`Imagem ${j + 1} de ${projeto.title}`"
                class="h-20 w-28 rounded-lg border border-white/10 object-cover"
              />
              <button
                type="button"
                class="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-ink-900 text-xs text-fg-subtle transition-colors hover:border-red-400 hover:text-red-400"
                :aria-label="`Remover imagem ${j + 1}`"
                @click="projeto.images.splice(j, 1)"
              >
                <i class="bx bx-x" aria-hidden="true" />
              </button>
              <span
                v-if="j === 0"
                class="absolute bottom-1 left-1 rounded bg-ink-950/80 px-1.5 py-0.5 text-[0.6rem] font-semibold text-accent-300"
              >
                capa
              </span>
            </div>
          </div>

          <input
            :ref="(el) => (inputsImagem[i] = el)"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            multiple
            class="hidden"
            @change="enviarImagens($event, projeto)"
          />
          <button
            type="button"
            class="botao-secundario"
            :disabled="enviandoEm === i"
            @click="abrirSeletor(i)"
          >
            <i class="bx bx-image-add" aria-hidden="true" />
            {{ enviandoEm === i ? 'Enviando…' : 'Adicionar imagens' }}
          </button>
          <p class="mt-2 text-xs text-fg-subtle">
            A primeira imagem é a capa do card. Envie já otimizadas (WebP de preferência) —
            elas são servidas como estão.
          </p>
        </div>

        <!-- Tags -->
        <div class="mt-5">
          <AdminListaTexto
            v-model="projeto.tags"
            rotulo="Tags"
            placeholder="Nuxt 3, TypeScript…"
            texto-adicionar="Adicionar tag"
          />
        </div>
      </article>

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
useSeoMeta({ title: 'Projetos', robots: 'noindex, nofollow' })

const { carregarProjetos, salvarProjetos, enviarArquivo } = useAdminApi()

const projetos = ref(null)
const salvando = ref(false)
const enviandoEm = ref(null)
const erro = ref('')
const sucesso = ref('')
const inputsImagem = ref([])

onMounted(async () => {
  try {
    projetos.value = await carregarProjetos()
  } catch (e) {
    erro.value = mensagemDeErro(e)
  }
})

const abrirSeletor = (i) => inputsImagem.value[i]?.click()

const adicionar = () => {
  // id 0 sinaliza "novo" — o servidor atribui o próximo id livre.
  projetos.value.unshift({
    id: 0,
    slug: '',
    title: '',
    category: '',
    tagline: '',
    description: '',
    images: [],
    tags: [],
    featured: false,
  })
}

const remover = (i) => {
  const nome = projetos.value[i].title || 'este projeto'
  if (!confirm(`Remover ${nome}? A alteração só vale depois de salvar.`)) return
  projetos.value.splice(i, 1)
}

const mover = (i, direcao) => {
  const destino = i + direcao
  if (destino < 0 || destino >= projetos.value.length) return
  const [item] = projetos.value.splice(i, 1)
  projetos.value.splice(destino, 0, item)
}

const enviarImagens = async (evento, projeto) => {
  const arquivos = Array.from(evento.target.files ?? [])
  if (!arquivos.length) return

  erro.value = ''
  enviandoEm.value = projetos.value.indexOf(projeto)
  try {
    // Sequencial de propósito: em paralelo, várias imagens grandes de uma vez
    // competem por memória no servidor pequeno.
    for (const arquivo of arquivos) {
      const { caminho } = await enviarArquivo(arquivo)
      projeto.images.push(caminho)
    }
    sucesso.value = `${arquivos.length} imagem(ns) enviada(s). Clique em Salvar para publicar.`
  } catch (e) {
    erro.value = mensagemDeErro(e)
  } finally {
    enviandoEm.value = null
    evento.target.value = ''
  }
}

const salvar = async () => {
  erro.value = ''
  sucesso.value = ''
  salvando.value = true
  try {
    projetos.value = await salvarProjetos(projetos.value)
    sucesso.value = 'Projetos salvos. O site já está mostrando as alterações.'
  } catch (e) {
    erro.value = mensagemDeErro(e)
  } finally {
    salvando.value = false
  }
}
</script>
