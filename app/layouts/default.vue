<template>
  <div class="flex min-h-screen flex-col bg-ink-950">
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>

    <Header />

    <main id="conteudo" class="flex-1">
      <slot />
    </main>

    <Footer />

    <BackToTop />
  </div>
</template>
