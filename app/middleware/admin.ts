/**
 * Protege as rotas do painel.
 *
 * A checagem real é do servidor (o cookie é httpOnly e assinado) — este
 * middleware só evita mostrar a tela para quem já sabemos que não tem sessão.
 * Nenhuma rota de escrita depende dele: toda /api/admin valida por conta.
 */

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') return

  // useRequestFetch repassa os cookies do navegador durante o SSR;
  // com $fetch puro a sessão não chegaria ao servidor e daria falso negativo.
  const buscar = useRequestFetch()

  try {
    const { autenticado } = await buscar<{ autenticado: boolean }>('/api/admin/sessao')
    if (!autenticado) return navigateTo('/admin/login')
  } catch {
    return navigateTo('/admin/login')
  }
})
