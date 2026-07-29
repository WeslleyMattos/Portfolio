<template>
  <div>
    <span v-if="rotulo" class="rotulo">{{ rotulo }}</span>

    <div class="space-y-2">
      <div v-for="(_, i) in modelValue" :key="i" class="flex gap-2">
        <input
          :value="modelValue[i]"
          type="text"
          class="campo"
          :placeholder="placeholder"
          @input="atualizar(i, $event.target.value)"
        />
        <button
          type="button"
          class="shrink-0 rounded-lg px-3 text-fg-subtle transition-colors hover:bg-red-500/10 hover:text-red-400"
          :aria-label="`Remover item ${i + 1}`"
          @click="remover(i)"
        >
          <i class="bx bx-trash" aria-hidden="true" />
        </button>
      </div>
    </div>

    <button type="button" class="mt-2 botao-secundario" @click="adicionar">
      <i class="bx bx-plus" aria-hidden="true" />
      {{ textoAdicionar }}
    </button>
  </div>
</template>

<script setup>
/**
 * Editor de lista de textos simples — usado para tags, itens de stack,
 * destaques de experiência e equipamentos.
 *
 * Emite um array novo a cada mudança em vez de mutar o original: o pai
 * guarda o estado e decide quando salvar.
 */
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  rotulo: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  textoAdicionar: { type: String, default: 'Adicionar' },
})

const emit = defineEmits(['update:modelValue'])

const atualizar = (indice, valor) => {
  const copia = [...props.modelValue]
  copia[indice] = valor
  emit('update:modelValue', copia)
}

const remover = (indice) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((_, i) => i !== indice),
  )
}

const adicionar = () => emit('update:modelValue', [...props.modelValue, ''])
</script>
