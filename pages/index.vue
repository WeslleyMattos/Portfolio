<template>
    <Header />

    <section class="relative w-full min-h-screen flex items-center justify-between px-6 md:px-[10%] pt-20 md:pt-24 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-400 overflow-x-hidden">
        
        <!-- Profile Image como background em mobile -->
        <div class="absolute inset-0 lg:hidden flex items-center justify-center opacity-20 pointer-events-none">
            <ProfileImg src="/eu.png" alt="Weslley Renan" size="lg" />
        </div>

        <div class="relative z-10 max-w-full md:max-w-5xl text-left">
            <h3
                class="text-xl md:text-2xl text-gray-200 font-semibold opacity-0 animate-[slideRight_0.8s_ease_forwards]">
                Hello World! I’m
            </h3>

            <h1
                class="text-4xl md:text-5xl text-white font-bold mt-1 opacity-0 animate-[slideRight_0.8s_ease_forwards] delay-[0.2s]">
                Weslley Renan
            </h1>

            <h2
                class="text-xl md:text-3xl font-bold mb-6 opacity-0 animate-[slideRight_0.8s_ease_forwards] delay-[0.4s] break-words">
                <span class="text-orange-500 words"></span>
            </h2>

            <p
                class="text-base md:text-lg text-gray-300 leading-relaxed opacity-0 animate-[slideLeft_0.8s_ease_forwards] delay-[0.6s]">
                Desenvolvedor frontend focado na criação de interfaces modernas,
                responsivas e performáticas, utilizando Vue, Nuxt e Tailwind CSS,
                sempre priorizando boas práticas e experiência do usuário.
            </p>

            <!-- Social links -->
            <div class="flex gap-4 mt-6 opacity-0 animate-[slideLeft_0.8s_ease_forwards] delay-[0.8s]">
                <a href="https://www.linkedin.com/in/weslley-mattos/" target="_blank"
                    class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-500 text-blue-500 text-xl transition-all hover:bg-blue-500 hover:text-white hover:shadow-lg">
                    <i class="bx bxl-linkedin"></i>
                </a>

                <a href="mailto:weslleymattos2009@gmail.com"
                    class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 text-xl transition-all hover:bg-red-500 hover:text-white hover:shadow-lg">
                    <i class="bx bx-envelope"></i>
                </a>

                <a href="https://github.com/WeslleyMattos" target="_blank"
                    class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-300 text-xl transition-all hover:bg-white hover:text-gray-900 hover:shadow-lg">
                    <i class="bx bxl-github"></i>
                </a>

                <a href="https://wa.me/5547997271958?text=Olá,%20vi%20seu%20portfólio%20e%20gostaria%20de%20falar%20com%20você!"
                    target="_blank"
                    class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-500 text-green-500 text-xl transition-all hover:bg-green-500 hover:text-white hover:shadow-lg">
                    <i class="bx bxl-whatsapp"></i>
                </a>
            </div>

            <!-- CTA -->
            <div
                class="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-[slideLeft_0.8s_ease_forwards] delay-[1s]">
                <NuxtLink to="/portfolio"
                    class="px-8 py-3 bg-orange-500 text-white rounded-full font-semibold text-center hover:bg-orange-600 transition">
                    Ver projetos
                </NuxtLink>

                <NuxtLink to="/sobre"
                    class="px-8 py-3 border border-gray-300 text-gray-200 rounded-full font-semibold text-center hover:bg-white hover:text-gray-900 transition">
                    Sobre mim
                </NuxtLink>
            </div>
        </div>

        <!-- Profile Image visível apenas em desktop -->
        <div class="hidden lg:block opacity-0 animate-[slideLeft_0.8s_ease_forwards] delay-[1.2s]">
            <ProfileImg src="/eu.png" alt="Weslley Renan" size="lg" />
        </div>
    </section>
</template>

<script setup>
import Typed from "typed.js";
import ProfileImg from "~/components/profile-img.vue";
import { onMounted } from "vue";

onMounted(() => {
    // Prevenir overflow horizontal
    document.body.style.overflowX = 'hidden';
    
    new Typed(".words", {
        strings: [
            "Frontend Developer",
            "Web Developer",
            "JavaScript Dev",
            "Full Stack Dev"
        ],
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 1200,
        loop: true,
    });
});
</script>

<style>
@import url("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");

@keyframes slideRight {
    from {
        transform: translateX(-60px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideLeft {
    from {
        transform: translateX(60px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
