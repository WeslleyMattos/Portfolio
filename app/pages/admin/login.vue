<template>
  <div class="grid min-h-screen place-items-center bg-ink-950 px-5">
    <form
      class="w-full max-w-sm rounded-card border border-white/10 bg-ink-900 p-8"
      @submit.prevent="entrarNoPainel"
    >
      <div class="mb-7 text-center">
        <span
          class="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-base font-black text-ink-950"
        >
          WM
        </span>
        <h1 class="mt-4 text-xl font-bold text-fg">Painel administrativo</h1>
        <p class="mt-1 text-sm text-fg-subtle">Acesso restrito</p>
      </div>

      <label for="senha" class="mb-2 block text-sm font-medium text-fg-muted">Senha</label>
      <input
        id="senha"
        v-model="senha"
        type="password"
        autocomplete="current-password"
        required
        class="campo"
        :disabled="enviando"
      />

      <p v-if="erro" class="mt-3 flex items-start gap-2 text-sm text-red-400" role="alert">
        <i class="bx bx-error-circle mt-0.5 shrink-0" aria-hidden="true" />
        <span>{{ erro }}</span>
      </p>

      <button type="submit" class="mt-6 w-full botao-primario" :disabled="enviando">
        {{ enviando ? 'Entrando…' : 'Entrar' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({ layout: false })
useSeoMeta({ title: 'Painel', robots: 'noindex, nofollow' })

const { entrar } = useAdminApi()

const senha = ref('')
const erro = ref('')
const enviando = ref(false)

const entrarNoPainel = async () => {
  erro.value = ''
  enviando.value = true
  try {
    await entrar(senha.value)
    await navigateTo('/admin')
  } catch (e) {
    erro.value = mensagemDeErro(e)
    senha.value = ''
  } finally {
    enviando.value = false
  }
}
</script>
