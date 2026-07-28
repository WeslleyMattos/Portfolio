<template>
  <h2 class="flex items-center gap-3 text-2xl font-bold text-fg sm:text-3xl">
    <span
      class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/12 text-xl text-accent-400"
      aria-hidden="true"
    >
      <i :class="icon" />
    </span>
    <slot />
  </h2>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
})
</script>
