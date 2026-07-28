<script setup>
defineProps({
  name: String
})
</script>

<template>
  <span class="px-3 py-1 border border-gray-600 rounded-full text-sm text-gray-300">
    {{ name }}
  </span>
</template>
