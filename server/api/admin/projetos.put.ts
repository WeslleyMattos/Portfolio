/**
 * Grava a lista inteira de projetos de uma vez.
 *
 * O painel edita poucos itens e envia o conjunto completo — isso evita
 * endpoints separados de criar/editar/reordenar e mantém a ordem da grade
 * como um dado explícito, não como efeito colateral do banco.
 */

import type { Project } from '../../../app/data/tipos'
import { exigirAdmin } from '../../utils/auth'
import { gerarSlug, gravarProjetos, lerProjetos, proximoId } from '../../utils/conteudo'

export default defineEventHandler(async (event) => {
  exigirAdmin(event)

  const corpo = await readBody<Project[]>(event)
  if (!Array.isArray(corpo)) {
    throw createError({ statusCode: 400, message: 'Esperada uma lista de projetos' })
  }

  const existentes = await lerProjetos()
  let idLivre = proximoId(existentes)
  const slugsUsados = new Set<string>()

  const normalizados: Project[] = corpo.map((bruto) => {
    const title = String(bruto?.title ?? '').trim()
    if (!title) {
      throw createError({ statusCode: 400, message: 'Todo projeto precisa de um título' })
    }

    // Slug precisa ser único: ele é a chave da URL do projeto.
    let slug = gerarSlug(String(bruto.slug ?? '').trim() || title)
    if (!slug) slug = `projeto-${idLivre}`
    let sufixo = 2
    const base = slug
    while (slugsUsados.has(slug)) slug = `${base}-${sufixo++}`
    slugsUsados.add(slug)

    const id = Number.isInteger(bruto.id) && bruto.id > 0 ? bruto.id : idLivre++

    return {
      id,
      slug,
      title,
      category: String(bruto.category ?? '').trim(),
      tagline: String(bruto.tagline ?? '').trim(),
      description: String(bruto.description ?? '').trim(),
      images: Array.isArray(bruto.images) ? bruto.images.filter((i) => typeof i === 'string') : [],
      tags: Array.isArray(bruto.tags) ? bruto.tags.filter((t) => typeof t === 'string') : [],
      featured: Boolean(bruto.featured),
      ...(bruto.url ? { url: String(bruto.url) } : {}),
    }
  })

  // Dois projetos com o mesmo id quebrariam o :key da listagem
  const ids = new Set<number>()
  for (const p of normalizados) {
    while (ids.has(p.id)) p.id = idLivre++
    ids.add(p.id)
  }

  return gravarProjetos(normalizados)
})
