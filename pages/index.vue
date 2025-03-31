<template>
    <Header />
    <div class="relative w-full h-screen bg-cover bg-center flex items-center px-[10%] pt-[70px]"
        style="background-image: url('wallpaperwess.png');">
        <div class="max-w-[600px]">
            <h3 class="text-2xl text-gray-100 font-bold opacity-0 animate-[slideRight_1s_ease_forwards] delay-[0.6s]">
                Hello World! It's me
            </h3>
            <h1
                class="text-5xl text-gray-100 font-bold mt-[-3px] opacity-0 animate-[slideRight_1s_ease_forwards] delay-[1s]">
                Weslley Renan,
            </h1>
            <h3
                class="text-2xl text-gray-100 font-bold mb-8 opacity-0 animate-[slideRight_1s_ease_forwards] delay-[1.4s]">
                E sou um <span class="words text-blue-500"></span>
            </h3>
            <p class="text-lg text-gray-100 opacity-0 animate-[slideLeft_1s_ease_forwards] delay-[2.5s]">
                Ingressando na área de programação no objetivo de ser um desenvolvedor full-stack!
            </p>
            <div class="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com/in/weslley-mattos/"
                    class="w-10 h-10 flex justify-center items-center border-2 border-blue-500 rounded-full text-2xl text-blue-500 transition-opacity opacity-0 animate-[slideLeft_1s_ease_forwards] delay-[2.8s] hover:bg-white hover:text-gray-900 hover:shadow-lg">
                    <i class="bx bxl-linkedin-square"></i>
                </a>
                <a href="mailto:weslleymattos2009@gmail.com"
                    class="w-10 h-10 flex justify-center items-center border-2 border-red-500 rounded-full text-2xl text-red-500 transition-opacity opacity-0 animate-[slideLeft_1s_ease_forwards] delay-[3s] hover:bg-white hover:text-gray-900 hover:shadow-lg">
                    <i class="bx bx-envelope"></i>
                </a>
                <a href="https://github.com/WeslleyMattos"
                    class="w-10 h-10 flex justify-center items-center border-2 border-gray-100 rounded-full text-2xl text-gray-100 transition-opacity opacity-0 animate-[slideLeft_1s_ease_forwards] delay-[3.2s] hover:bg-white hover:text-gray-900 hover:shadow-lg">
                    <i class="bx bxl-github"></i>
                </a>
                <a href="https://w.app/HSV6v8"
                    class="w-10 h-10 flex justify-center items-center border-2 border-green-500 rounded-full text-2xl text-green-500 transition-opacity opacity-0 animate-[slideLeft_1s_ease_forwards] delay-[3.4s] hover:bg-white hover:text-gray-900 hover:shadow-lg">
                    <i class="bx bxl-whatsapp"></i>
                </a>
            </div>
            <NuxtLink to="/sobre"
                class="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold tracking-wider opacity-0 animate-[slideLeft_1s_ease_forwards] delay-[3.2s] hover:bg-white hover:shadow-lg hover:text-gray-900">
                Mais sobre mim
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import Typed from "typed.js";

onMounted(() => {
    new Typed(".words", {
        strings: ["Frontend Developer", "Web Developer", "Backend Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
    });
});
</script>

<style>
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

@keyframes slideRight {
    from {
        transform: translateX(-100px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideLeft {
    from {
        transform: translateX(100px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
