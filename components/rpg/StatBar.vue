<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  label: String,
  value: Number
})

const animatedValue = ref(0)

const animateValue = () => {
  const duration = 1200 // duração da animação em ms
  const startTime = Date.now()
  const startValue = 0
  
  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3)
  }
  
  const animate = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutCubic(progress)
    
    animatedValue.value = startValue + (props.value - startValue) * easedProgress
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      animatedValue.value = props.value
    }
  }
  
  requestAnimationFrame(animate)
}

onMounted(() => {
  animateValue()
})

watch(() => props.value, () => {
  animatedValue.value = 0
  animateValue()
})
</script>

<template>
  <div class="mb-4">
    <div class="flex justify-between mb-2 text-sm">
      <span class="text-gray-300 font-medium">{{ label }}</span>
      <span class="text-yellow-400 font-semibold">{{ Math.round(animatedValue) }}/20</span>
    </div>

    <div class="w-full h-3 bg-gray-800 rounded-full border border-gray-700 overflow-hidden shadow-inner">
      <div
        class="h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-300 shadow-lg"
        :style="{ width: `${animatedValue * 5}%` }"
      ></div>
    </div>
  </div>
</template>
