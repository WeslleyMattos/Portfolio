<script setup>
defineProps({
  title: String,
  skills: Array
})
</script>

<template>
  <div class="border border-yellow-700 border-opacity-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-5 transition-all duration-300 shadow-lg mb-4">
    <h3 class="text-yellow-400 font-bold mb-6 flex items-center gap-2">
      ✨ {{ title }}
    </h3>
    <div class="space-y-4">
      <div v-for="(skill, index) in skills" :key="index">
        <div class="flex gap-4">
          <div class="text-3xl flex-shrink-0">{{ skill.icon }}</div>
          <div class="flex-1">
            <div class="flex items-baseline gap-2 mb-1">
              <span class="text-yellow-400 font-semibold text-sm">{{ skill.title }}</span>
              <span class="text-gray-400 text-xs">•</span>
              <span class="text-gray-300 font-medium text-sm">{{ skill.name }}</span>
            </div>
            <p class="text-xs text-gray-400 mb-2 leading-relaxed">
              {{ skill.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(bonus, bIndex) in skill.bonuses" 
                :key="bIndex"
                class="text-xs bg-yellow-900 bg-opacity-30 text-yellow-300 px-2 py-1 rounded border border-yellow-700 border-opacity-40"
              >
                {{ bonus }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="index < skills.length - 1" class="border-b border-dotted border-gray-600 opacity-50 mt-4"></div>
      </div>
    </div>
  </div>
</template>
