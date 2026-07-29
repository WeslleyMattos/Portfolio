/** Conteúdo público consumido pelas páginas do site. */

import type { ConteudoPublico } from '../../app/data/tipos'
import { lerPerfil, lerProjetos } from '../utils/conteudo'

export default defineEventHandler(async (event): Promise<ConteudoPublico> => {
  const [perfil, projetos] = await Promise.all([lerPerfil(), lerProjetos()])

  // Sem cache: a proposta do painel é a edição aparecer na hora.
  setHeader(event, 'cache-control', 'no-store')

  return { perfil, projetos }
})
