<template>
    <Header />
    <section class="min-h-screen bg-gradient-to-br from-black via-slate-950 to-gray-700 py-20 px-6 bg-blend-overlay" style="background-image: url('/dragon.png'); background-size: cover; background-position: center; background-attachment: fixed;">
        <CharacterCard>

            <!-- Atributos -->
            <div>
                <h2 class="text-xl font-bold mb-4 text-yellow-500">Atributos</h2>
                <StatBar label="HTML / CSS" :value="14" />
                <StatBar label="JavaScript" :value="10" />
                <StatBar label="Vue / Nuxt" :value="12" />
                <StatBar label="Tailwind" :value="13" />
                <StatBar label="Backend" :value="7" />
                <StatBar label="Banco de Dados" :value="6" />
                <StatBar label="Comunicação" :value="16" />
                <StatBar label="Trabalho em Equipe" :value="17" />
                <StatBar label="Resolução de Problemas" :value="15" />
                <StatBar label="Gestão de Tempo" :value="14" />
                <StatBar label="Inglês" :value="16" />
            </div>

            <!-- Habilidades -->
            <div>
                <h2 class="text-xl font-bold mb-4 text-yellow-500">Habilidades</h2>
                <SkillItem title="Life Skills" :skills="[
                    {
                        icon: '👨‍👦',
                        title: 'Paternidade',
                        name: 'Pai de um filho',
                        description: 'Experiência diária que desenvolve inteligência emocional e responsabilidade.',
                        bonuses: ['+10 Paciência', '+15 Responsabilidade', '+20 Multitarefa']
                    },
                    {
                        icon: '🎸',
                        title: 'Habilidade Artística',
                        name: 'Tocar Violão',
                        description: 'Prática musical que estimula criatividade, foco e sensibilidade artística.',
                        bonuses: ['+15 Criatividade', '+10 Concentração', '+5 Disciplina']
                    },
                    {
                        icon: '🎣',
                        title: 'Habilidade de Sobrevivência',
                        name: 'Pesca',
                        description: 'Atividade que exige paciência, observação e controle emocional.',
                        bonuses: ['+20 Paciência', '+10 Estratégia', '+10 Persistência']
                    },
                    {
                        icon: '🧠',
                        title: 'Habilidade Passiva',
                        name: 'Aprendizado Contínuo',
                        description: 'Busca constante por evolução pessoal e técnica.',
                        bonuses: ['+15 Adaptabilidade', '+10 Resolução de Problemas']
                    },
                    {
                        icon: '⚖️',
                        title: 'Habilidade Passiva',
                        name: 'Equilíbrio Vida & Trabalho',
                        description: 'Capacidade de manter produtividade sem comprometer a vida pessoal.',
                        bonuses: ['+10 Organização', '+10 Consistência']
                    }
                ]" />
            </div>

            <!-- Equipamentos -->
            <div class="md:col-span-2">
                <h2 class="text-xl font-bold mb-4 text-yellow-500">Equipamentos</h2>
                <div class="flex flex-wrap gap-2">
                    <EquipmentItem name="Insomnia" />
                    <EquipmentItem name="VS Code" />
                    <EquipmentItem name="Canva" />
                    <EquipmentItem name="Photoshop" />
                    <EquipmentItem name="DBeaver" />
                    <EquipmentItem name="Git / GitHub / Gitlab" />
                </div>
            </div>

        </CharacterCard>
    </section>
</template>

<script setup>
import CharacterCard from "~/components/rpg/CharacterCard.vue";
import EquipmentItem from "~/components/rpg/EquipmentItem.vue";
import SkillItem from "~/components/rpg/SkillItem.vue";
import StatBar from "~/components/rpg/StatBar.vue";
</script>
