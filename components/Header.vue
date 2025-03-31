<template>
  <header class="bg-gray-900 text-white py-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center px-4">
      <a href="#" class="text-xl font-bold">Portfolio</a>
      <nav class="navbar space-x-4">
        <NuxtLink to="/" class="nav-item" style="--i: 1">
          <i class="bx bx-home"></i> Início
        </NuxtLink>
        <NuxtLink to="/sobre" class="nav-item" style="--i: 2">
          <i class="bx bx-user"></i> Sobre
        </NuxtLink>
        <NuxtLink to="/skills" class="nav-item" style="--i: 3">
          <i class="bx bx-code"></i> Skills
        </NuxtLink>
        <NuxtLink to="/portfolio" class="nav-item" style="--i: 4">
          <i class="bx bx-briefcase"></i> Portfolio
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

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
  animation-delay: calc(0.2s * var(--i));
}

.navbar .nav-item i {
  margin-right: 8px;
  font-size: 20px;
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
