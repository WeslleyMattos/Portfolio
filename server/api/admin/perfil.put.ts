import type { Perfil } from '../../../app/data/tipos'
import { exigirAdmin } from '../../utils/auth'
import { gravarPerfil } from '../../utils/conteudo'

export default defineEventHandler(async (event) => {
  exigirAdmin(event)

  const corpo = await readBody<Partial<Perfil>>(event)
  if (!corpo || typeof corpo !== 'object') {
    throw createError({ statusCode: 400, message: 'Corpo inválido' })
  }

  // Campos livres de texto seguem livres, mas os que o site usa como caminho
  // ou número precisam de forma previsível, senão quebram a renderização.
  if (corpo.fotoPerfil !== undefined && typeof corpo.fotoPerfil !== 'string') {
    throw createError({ statusCode: 400, message: 'fotoPerfil deve ser texto' })
  }
  for (const chave of ['techStats', 'softStats'] as const) {
    const lista = corpo[chave]
    if (lista === undefined) continue
    if (!Array.isArray(lista)) {
      throw createError({ statusCode: 400, message: `${chave} deve ser uma lista` })
    }
    for (const item of lista) {
      const valor = Number(item?.value)
      if (!Number.isFinite(valor) || valor < 0 || valor > 20) {
        throw createError({
          statusCode: 400,
          message: `${chave}: nota deve ser um número de 0 a 20`,
        })
      }
      item.value = valor
    }
  }

  return gravarPerfil(corpo as Perfil)
})
