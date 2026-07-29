/**
 * Serve os arquivos enviados pelo painel.
 *
 * Eles moram fora do `.output`, então o servidor estático do Nitro não os
 * enxerga — esta rota faz a ponte.
 */

import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { dirUploads } from '../../utils/armazenamento'
import { CONTENT_TYPES, extensaoDe, nomeSeguro } from '../../utils/arquivos'

export default defineEventHandler(async (event) => {
  const caminho = getRouterParam(event, 'caminho') ?? ''

  // A rota é catch-all, mas os uploads são sempre planos: um nível só.
  // Recusar qualquer coisa com barra fecha a porta para path traversal.
  if (caminho.includes('/') || !nomeSeguro(caminho)) {
    throw createError({ statusCode: 400, message: 'Caminho inválido' })
  }

  const arquivo = join(dirUploads(), caminho)

  try {
    await stat(arquivo)
  } catch {
    throw createError({ statusCode: 404, message: 'Arquivo não encontrado' })
  }

  const tipo = CONTENT_TYPES[extensaoDe(caminho)] ?? 'application/octet-stream'
  setHeader(event, 'content-type', tipo)
  // O nome carrega um sufixo aleatório, então o conteúdo nunca muda sob a
  // mesma URL — pode cachear com folga.
  setHeader(event, 'cache-control', 'public, max-age=31536000, immutable')

  return readFile(arquivo)
})
