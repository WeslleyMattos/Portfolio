<template>
    <div class="max-w-6xl mx-auto">
        <div
            class="bg-gradient-to-br from-[#2a2420] via-[#1e1b18] to-[#1a1715] text-gray-200 rounded-2xl p-8 shadow-2xl border border-yellow-700 border-opacity-30">

            <!-- Header com espaço para imagem -->
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
                <div class="flex-1 order-2 md:order-1">
                    <h1
                        class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                        Weslley Renan
                    </h1>
                    <p class="text-base text-gray-300 font-semibold">
                        🗡️ Classe: Frontend Arcano • 👤 Raça: Humano
                    </p>
                    <p class="text-sm text-gray-400 mt-1">
                        Desenvolvedor especializado em Vue, Nuxt e Tailwind CSS
                    </p>
                </div>

                <!-- Espaço quadrado para imagem -->
                <div class="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-yellow-700 to-orange-800 rounded-xl border-2 border-yellow-600 shadow-lg overflow-hidden order-1 md:order-2 mx-auto md:mx-0">
                    <img src="/mago2.png" alt="Weslley Renan" class="absolute inset-0 w-full h-full object-cover" />
                </div>

                <div class="order-3">
                    <Dice />
                </div>
            </div>

            <!-- Divider -->
            <div class="h-px bg-gradient-to-r from-yellow-700 via-orange-600 to-transparent mb-8"></div>

            <!-- Conteúdo -->
            <div class="grid md:grid-cols-2 gap-8">
                <slot />
            </div>

        </div>
    </div>
</template>

<script setup>
import Dice from '~/components/rpg/Dice.vue';
</script>
