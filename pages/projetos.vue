<template>
    <Header />
    <section class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-400 py-24 px-6">
        <div class="container mx-auto max-w-7xl">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                Meus <span class="text-orange-500">Projetos</span>
            </h1>
            <p class="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                Confira alguns dos projetos que desenvolvi ao longo de minha jornada como desenvolvedor frontend.
            </p>

            <!-- Grid de Projetos -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                <ProjectCard 
                    v-for="project in projects" 
                    :key="project.id"
                    :project="project"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const projects = ref([
    {
        id: 1,
        title: 'Flashback Hamburgueria',
        description: 'Sistema web desenvolvido com HTML, Bootstrap, CSS e JavaScript para gerenciar pedidos e cardápio de uma hamburgueria. Integração dos pedidos via WhatsApp.',
        images: ['/flashbackpainel2.png', '/flashback2.png', '/flashbackpainel.png', '/flashback.png', '/flashbackpainel3.png', '/flashbackpainel4.png', '/flashbackpainel5.png'],
        tags: ['HTML', 'MySQL', 'JavaScript', 'Node.js']
    },
    {
        id: 2,
        title: 'Shoy Doces',
        description: 'Sistema web desenvolvido com HTML, Bootstrap, CSS e JavaScript para gerenciar pedidos e cardápio de uma doceria. Integração dos pedidos via WhatsApp.',
        images: ['/shoy-doces1.png', '/shoy-doces2.png', '/shoy-doces3.png'],
        tags: ['HTML', 'Bootstrap', 'JavaScript', 'WhatsApp.API']
    },
    {
        id: 3,
        title: 'Você Pede Softwares',
        description: 'Landing page responsiva com animações suaves e design moderno.',
        images: ['/vocepede1.png', '/vocepede2.png', '/vocepede3.png', '/vocepede4.png'],
        tags: ['Nuxt 3', 'Tailwind', 'JavaScript', 'Animations']
    },
    {
        id: 4,
        title: 'Signals House',
        description: 'Landing page para venda de produtos digitais, com design atraente e foco na conversão.',
        images: ['/SignalsHouse.png', '/SignalsHouse2.png', '/SignalsHouse3.png', '/SignalsHouse4.png', '/SignalsHouse5.png'],
        tags: ['Nuxt 3', 'Tailwind', 'JavaScript', 'Nuxt-UI']
    },
    {
        id: 5,
        title: 'Signals House Painel',
        description: 'Painel performático analítico com gráficos interativos e visualização de dados em tempo real.',
        images: ['/Signalspainel1.png', '/Signalspainel2.png', '/Signalspainel3.png', '/Signalspainel4.png', '/Signalspainel5.png'],
        tags: ['Nuxt 3', 'Charts', 'APIs', 'Tailwind', 'JavaScript', 'Typescript', 'Docker']
    },
    {
        id: 6,
        title: 'Historic Bet',
        description: 'Landing page para plataforma de apostas em cassino, com design moderno e foco na experiência do usuário.',
        images: ['/Historicbet1.png', '/Historicbet2.png', '/Historicbet3.png', '/Historicbet4.png', '/Historicbet5.png'],
        tags: ['Nuxt 3', 'Tailwind', 'Creative', 'JavaScript', 'Animations', 'Nuxt-UI', 'Charts']
    }
]);
</script>
