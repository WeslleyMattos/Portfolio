<template>
  <div v-if="erro || sucesso" class="mb-6">
    <p
      v-if="erro"
      class="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
      role="alert"
    >
      <i class="bx bx-error-circle mt-0.5 shrink-0 text-base" aria-hidden="true" />
      <span>{{ erro }}</span>
    </p>

    <p
      v-else
      class="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
      role="status"
    >
      <i class="bx bx-check-circle mt-0.5 shrink-0 text-base" aria-hidden="true" />
      <span>{{ sucesso }}</span>
    </p>
  </div>
</template>

<script setup>
defineProps({
  erro: { type: String, default: '' },
  sucesso: { type: String, default: '' },
})
</script>
