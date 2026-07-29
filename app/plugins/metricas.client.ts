/**
 * Contabiliza um acesso a cada página vista.
 *
 * Roda só no cliente de propósito: contar no servidor a cada requisição
 * incluiria bots, o curl de verificação do deploy e o próprio health check.
 * O beacon aqui conta navegador de verdade.
 *
 * O painel é excluído — não faz sentido você inflar a própria métrica
 * enquanto edita o site.
 */

export default defineNuxtPlugin(() => {
  const router = useRouter()

  const registrar = (caminho: string) => {
    if (caminho.startsWith('/admin')) return

    // keepalive garante o envio mesmo se a navegação sair da página na sequência
    $fetch('/api/metricas/visita', { method: 'POST', keepalive: true }).catch(() => {
      // Métrica nunca deve quebrar a navegação: falha em silêncio.
    })
  }

  router.afterEach((to) => registrar(to.path))

  // O afterEach não dispara para o primeiro carregamento
  registrar(router.currentRoute.value.path)
})
