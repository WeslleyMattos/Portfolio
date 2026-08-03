<template>
  <!-- Enviada pelo painel: servida como está, sem IPX.
       O IPX resolve caminhos dentro do .output, e os uploads moram fora dele
       para sobreviver aos deploys — passar por ele resultaria em 404.
       Em troca, essas imagens já chegam redimensionadas e em WebP, porque a
       otimização acontece uma vez no upload. -->
  <img
    v-if="ehUpload"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :fetchpriority="preload ? 'high' : undefined"
    decoding="async"
  />

  <!-- Veio no build: o IPX otimiza sob demanda -->
  <NuxtImg
    v-else
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :format="format"
    :quality="quality"
    :loading="loading"
    :preload="preload"
  />
</template>

<script setup>
/**
 * Escolhe entre <img> e <NuxtImg> conforme a origem da imagem.
 *
 * Existe para que essa decisão fique num lugar só: antes ela precisaria ser
 * repetida em toda tela que exibe conteúdo editável, e esquecer uma delas
 * significa imagem quebrada em produção — foi exatamente o que aconteceu com
 * a foto de perfil.
 */
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
  format: { type: String, default: 'webp' },
  quality: { type: [String, Number], default: 80 },
  loading: { type: String, default: 'lazy' },
  preload: { type: Boolean, default: false },
})

const ehUpload = computed(() => props.src?.startsWith('/uploads/'))
</script>
