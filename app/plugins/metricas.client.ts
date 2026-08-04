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

  // Só o afterEach. Ele já dispara na navegação inicial da hidratação —
  // eu antes chamava registrar() também no carregamento, e cada visita
  // era contada duas vezes.
  router.afterEach((to) => registrar(to.path))
})
