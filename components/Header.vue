<template>
  <header ref="headerRef" class="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 shadow-md z-50">
    <div class="container mx-auto flex justify-between items-center px-4">
      <a href="/" class="text-xl font-bold">Portfolio</a>
      
      <!-- Menu hambúrguer (mobile) -->
      <button @click="toggleMenu" class="md:hidden text-2xl focus:outline-none">
        <i :class="menuOpen ? 'bx bx-x' : 'bx bx-menu'"></i>
      </button>

      <!-- Menu desktop -->
      <nav class="hidden md:flex navbar space-x-4" ref="navbar">
        <NuxtLink to="/" class="nav-item">
          <i class="bx bx-home"></i> Início
        </NuxtLink>
        <NuxtLink to="/sobre" class="nav-item">
          <i class="bx bx-user"></i> Sobre
        </NuxtLink>
        <NuxtLink to="/projetos" class="nav-item">
          <i class="bx bx-briefcase"></i> Projetos
        </NuxtLink>
      </nav>
    </div>

    <!-- Menu mobile -->
    <nav v-show="menuOpen" class="md:hidden bg-gray-800 border-t border-gray-700">
      <div class="flex flex-col space-y-2 py-4 px-4">
        <NuxtLink to="/" @click="closeMenu" class="nav-item-mobile">
          <i class="bx bx-home"></i> Início
        </NuxtLink>
        <NuxtLink to="/sobre" @click="closeMenu" class="nav-item-mobile">
          <i class="bx bx-user"></i> Sobre
        </NuxtLink>
        <NuxtLink to="/projetos" @click="closeMenu" class="nav-item-mobile">
          <i class="bx bx-briefcase"></i> Projetos
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

const navbar = ref(null);
const headerRef = ref(null);
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const handleClickOutside = (event) => {
  if (headerRef.value && !headerRef.value.contains(event.target)) {
    closeMenu();
  }
};

watch(menuOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

onMounted(() => {
  if (navbar.value) {
    const navItems = navbar.value.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
      item.style.animationDelay = `${0.2 * (index + 1)}s`;
    });
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style>
.navbar .nav-item {
  display: inline-flex;
  align-items: center;
  font-size: 15px;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  margin-left: 20px;
  transition: 0.3s;
  opacity: 0;
  animation: slideTop 0.5s ease forwards;
}

.navbar .nav-item i {
  margin-right: 8px;
  font-size: 20px;
}
.nav-item-mobile {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #e5e7eb;
  text-decoration: none;
  font-weight: 500;
  padding: 12px;
  transition: all 0.3s;
  border-radius: 8px;
}

.nav-item-mobile i {
  margin-right: 12px;
  font-size: 20px;
}

.nav-item-mobile:hover {
  background-color: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
}

.nav-item-mobile.router-link-active {
  background-color: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}


.navbar .nav-item:hover {
  color: var(--color-hover);
}

.navbar .router-link-active {
  color: var(--color-hover);
}

@keyframes slideTop {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
