<template>
    <div class="relative flex items-center justify-center" :class="sizeClass">
        <!-- Anel animado -->
        <div
            class="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-zinc-900 via-cyan-400 to-zinc-900 animate-spin-slow">
            <div class="w-full h-full rounded-full bg-[#0f172a]"></div>
        </div>

        <!-- Imagem -->
        <img :src="src" :alt="alt" class="relative z-10 rounded-full object-cover border-4 border-[#0f172a]"
            :class="imageClass" />
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        default: 'Profile image',
    },
    size: {
        type: String,
        default: 'md', // sm | md | lg
    },
})

const sizeClass = computed(() => {
    return {
        sm: 'w-48 h-48',
        md: 'w-80 h-80',
        lg: 'w-96 h-96',
    }[props.size]
})

const imageClass = computed(() => {
    return {
        sm: 'w-44 h-44',
        md: 'w-72 h-72',
        lg: 'w-[22rem] h-[22rem]',
    }[props.size]
})
</script>

<style scoped>
@keyframes spinSlow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spinSlow 14s linear infinite;
}
</style>
