<template>
  <div>
    <header class="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-fg">Perfil</h1>
        <p class="mt-1 text-sm text-fg-subtle">
          Foto, contato e resumo. Aparecem na home, na página Sobre e no currículo.
        </p>
      </div>
      <button class="botao-primario" :disabled="salvando || !perfil" @click="salvar">
        <i class="bx bx-save text-lg" aria-hidden="true" />
        {{ salvando ? 'Salvando…' : 'Salvar' }}
      </button>
    </header>

    <AdminAviso :erro="erro" :sucesso="sucesso" />

    <div v-if="!perfil" class="cartao-admin text-sm text-fg-muted">Carregando…</div>

    <form v-else class="space-y-6" @submit.prevent="salvar">
      <!-- Foto -->
      <section class="cartao-admin">
        <h2 class="mb-4 font-bold text-fg">Foto de perfil</h2>

        <div class="flex flex-wrap items-center gap-6">
          <img
            :src="perfil.fotoPerfil"
            alt="Pré-visualização da foto de perfil"
            class="h-28 w-28 rounded-2xl border border-white/10 object-cover"
          />

          <div class="flex-1">
            <input
              ref="inputFoto"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/avif"
              class="hidden"
              @change="enviarFoto"
            />
            <button
              type="button"
              class="botao-secundario"
              :disabled="enviandoFoto"
              @click="inputFoto?.click()"
            >
              <i class="bx bx-upload" aria-hidden="true" />
              {{ enviandoFoto ? 'Enviando…' : 'Trocar foto' }}
            </button>

            <p class="mt-2 text-xs text-fg-subtle">
              PNG, JPG, WebP ou AVIF, até 8 MB. A imagem é usada também no preview de
              compartilhamento do WhatsApp e do LinkedIn — prefira algo próximo de
              quadrado e já otimizado.
            </p>
            <p class="mt-1 text-xs text-fg-subtle">Atual: {{ perfil.fotoPerfil }}</p>
          </div>
        </div>
      </section>

      <!-- Contato -->
      <section class="cartao-admin">
        <h2 class="mb-4 font-bold text-fg">Contato e identificação</h2>

        <div class="grid gap-4 sm:grid-cols-2">
          <div v-for="campo in camposContato" :key="campo.chave">
            <label :for="`c-${campo.chave}`" class="rotulo">{{ campo.label }}</label>
            <input
              :id="`c-${campo.chave}`"
              v-model="perfil.contato[campo.chave]"
              type="text"
              class="campo"
              :placeholder="campo.dica"
            />
            <p v-if="campo.ajuda" class="mt-1 text-xs text-fg-subtle">{{ campo.ajuda }}</p>
          </div>
        </div>
      </section>

      <!-- Resumo -->
      <section class="cartao-admin">
        <h2 class="mb-4 font-bold text-fg">Resumo profissional</h2>
        <label for="resumo" class="rotulo">
          Abre o currículo e a página Sobre no modo profissional
        </label>
        <textarea id="resumo" v-model="perfil.resumo" class="campo" rows="5" />
        <p class="mt-1 text-xs text-fg-subtle">{{ perfil.resumo.length }} caracteres</p>
      </section>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useSeoMeta({ title: 'Perfil', robots: 'noindex, nofollow' })

const { carregarPerfil, salvarPerfil, enviarArquivo } = useAdminApi()

const perfil = ref(null)
const salvando = ref(false)
const enviandoFoto = ref(false)
const erro = ref('')
const sucesso = ref('')
const inputFoto = ref(null)

const camposContato = [
  { chave: 'name', label: 'Nome' },
  { chave: 'fullName', label: 'Nome completo' },
  { chave: 'shortName', label: 'Nome curto', ajuda: 'Usado no título das páginas' },
  { chave: 'role', label: 'Cargo' },
  { chave: 'headline', label: 'Headline', dica: 'Vue · Nuxt · Tailwind CSS' },
  { chave: 'location', label: 'Localização' },
  { chave: 'email', label: 'E-mail' },
  {
    chave: 'phone',
    label: 'Telefone (só números)',
    dica: '5547999999999',
    ajuda: 'Com código do país e DDD — é o que monta o link do WhatsApp',
  },
  { chave: 'phoneDisplay', label: 'Telefone exibido', dica: '(47) 99999-9999' },
  { chave: 'site', label: 'Site' },
  { chave: 'github', label: 'GitHub (URL)' },
  { chave: 'linkedin', label: 'LinkedIn (URL)' },
]

/* Carrega no cliente, não no SSR: o cookie de sessão é httpOnly e um $fetch
   feito durante a renderização no servidor não o carrega junto — voltaria 401. */
onMounted(async () => {
  try {
    perfil.value = await carregarPerfil()
  } catch (e) {
    erro.value = mensagemDeErro(e)
  }
})

const enviarFoto = async (evento) => {
  const arquivo = evento.target.files?.[0]
  if (!arquivo) return

  erro.value = ''
  enviandoFoto.value = true
  try {
    const { caminho } = await enviarArquivo(arquivo)
    perfil.value.fotoPerfil = caminho
    // Salva na hora: uma foto enviada e não salva por esquecimento fica
    // ocupando espaço no servidor sem aparecer em lugar nenhum.
    await salvarPerfil({ fotoPerfil: caminho })
    sucesso.value = 'Foto atualizada e publicada.'
  } catch (e) {
    erro.value = mensagemDeErro(e)
  } finally {
    enviandoFoto.value = false
    evento.target.value = ''
  }
}

const salvar = async () => {
  erro.value = ''
  sucesso.value = ''
  salvando.value = true
  try {
    perfil.value = await salvarPerfil(perfil.value)
    sucesso.value = 'Perfil salvo. O site já está mostrando as alterações.'
  } catch (e) {
    erro.value = mensagemDeErro(e)
  } finally {
    salvando.value = false
  }
}
</script>
