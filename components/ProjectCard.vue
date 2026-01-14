<template>
    <!-- Overlay com imagem em tela cheia (mobile) - Renderizado fora do card -->
    <Teleport to="body">
        <div 
            v-if="isExpanded" 
            class="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4"
            style="z-index: 99999;"
            @click.stop="toggleExpand"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
        >
            <div class="relative w-full h-full flex items-center justify-center">
                <img 
                    v-for="(image, index) in project.images" 
                    :key="index"
                    :src="image" 
                    :alt="project.title"
                    class="max-w-full max-h-full object-contain transition-opacity duration-700 ease-in-out"
                    :class="currentImageIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0 absolute'"
                    @click.stop
                />
            </div>
            
            <!-- Setas de navegação em tela cheia -->
            <button 
                v-if="project.images.length > 1"
                @click.stop="prevImage"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-gray-900 bg-opacity-80 rounded-full flex items-center justify-center text-white text-3xl hover:bg-opacity-100 transition z-[100000]"
            >
                <i class="bx bx-chevron-left"></i>
            </button>
            <button 
                v-if="project.images.length > 1"
                @click.stop="nextImage"
                class="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-gray-900 bg-opacity-80 rounded-full flex items-center justify-center text-white text-3xl hover:bg-opacity-100 transition z-[100000]"
            >
                <i class="bx bx-chevron-right"></i>
            </button>

            <!-- Indicadores em tela cheia -->
            <div v-if="project.images.length > 1" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-[100000]">
                <button 
                    v-for="(image, index) in project.images" 
                    :key="index"
                    @click.stop="currentImageIndex = index"
                    class="w-3 h-3 rounded-full transition-all"
                    :class="currentImageIndex === index ? 'bg-white w-6' : 'bg-white/50'"
                ></button>
            </div>
            
            <!-- Botão de fechar -->
            <button 
                @click.stop="toggleExpand"
                class="absolute top-4 right-4 w-12 h-12 bg-gray-900 bg-opacity-80 rounded-full flex items-center justify-center text-white text-2xl hover:bg-gray-800 transition z-[100000]"
            >
                <i class="bx bx-x"></i>
            </button>
        </div>
    </Teleport>

    <div 
        class="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:scale-110 md:hover:scale-150"
        style="isolation: isolate;"
    >
        <div class="relative">
            <!-- Carrossel de Imagens -->
            <div 
                class="relative w-full h-56 overflow-hidden bg-gray-900" 
                @click="handleCardClick"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
            >
                <div class="relative h-full">
                    <img 
                        v-for="(image, index) in project.images" 
                        :key="index"
                        :src="image" 
                        :alt="`${project.title} - ${index + 1}`"
                        class="absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out"
                        :class="currentImageIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
                    />
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-40 pointer-events-none"></div>

                <!-- Setas de navegação -->
                <button 
                    v-if="project.images.length > 1"
                    @click.stop="prevImage"
                    class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition z-10"
                >
                    <i class="bx bx-chevron-left text-xl"></i>
                </button>
                <button 
                    v-if="project.images.length > 1"
                    @click.stop="nextImage"
                    class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition z-10"
                >
                    <i class="bx bx-chevron-right text-xl"></i>
                </button>

                <!-- Indicadores -->
                <div v-if="project.images.length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    <button 
                        v-for="(image, index) in project.images" 
                        :key="index"
                        @click.stop="currentImageIndex = index"
                        class="w-2 h-2 rounded-full transition-all"
                        :class="currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'"
                    ></button>
                </div>
            </div>

            <!-- Conteúdo -->
            <div class="p-5">
                <h3 class="text-xl font-bold text-white mb-2">
                    {{ project.title }}
                </h3>
                <p class="text-white text-sm mb-4 leading-relaxed">
                    {{ project.description }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                    <span 
                        v-for="(tag, index) in project.tags" 
                        :key="index"
                        class="text-xs bg-cyan-500 bg-opacity-20 text-white px-3 py-1 rounded-full border border-cyan-500 border-opacity-40"
                    >
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
    project: Object
});

const isExpanded = ref(false);
const currentImageIndex = ref(0);
const touchStartX = ref(0);
const touchEndX = ref(0);

const nextImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.project.images.length;
};

const prevImage = () => {
    currentImageIndex.value = currentImageIndex.value === 0 
        ? props.project.images.length - 1 
        : currentImageIndex.value - 1;
};

const handleCardClick = () => {
    toggleExpand();
};

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
    
    // Prevenir scroll quando expandido
    if (isExpanded.value) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
};

const handleKeyPress = (event) => {
    if (!isExpanded.value) return;
    
    if (event.key === 'ArrowRight') {
        nextImage();
    } else if (event.key === 'ArrowLeft') {
        prevImage();
    } else if (event.key === 'Escape') {
        toggleExpand();
    }
};

const handleTouchStart = (event) => {
    touchStartX.value = event.touches[0].clientX;
};

const handleTouchMove = (event) => {
    touchEndX.value = event.touches[0].clientX;
};

const handleTouchEnd = () => {
    if (touchStartX.value - touchEndX.value > 50) {
        // Swipe para esquerda - próxima imagem
        nextImage();
    }
    
    if (touchEndX.value - touchStartX.value > 50) {
        // Swipe para direita - imagem anterior
        prevImage();
    }
    
    touchStartX.value = 0;
    touchEndX.value = 0;
};

onMounted(() => {
    window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress);
    // Garantir que o scroll seja restaurado
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
});
</script>

<style scoped>
/* Transição suave para o hover no desktop */
@media (min-width: 768px) {
    .group:hover {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        z-index: 9999 !important;
        position: relative;
    }
}
</style>
