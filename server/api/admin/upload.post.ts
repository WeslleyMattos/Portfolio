/**
 * Recebe imagem ou PDF e grava no diretório de dados.
 *
 * Os arquivos vão para `<dados>/uploads`, nunca para dentro do `.output`:
 * o deploy troca o `.output` inteiro e levaria os envios junto.
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { exigirAdmin } from '../../utils/auth'
import { dirUploads } from '../../utils/armazenamento'
import { gerarSlug } from '../../utils/conteudo'
import {
  LIMITE_DOCUMENTO,
  LIMITE_IMAGEM,
  TIPOS_DOCUMENTO,
  TIPOS_IMAGEM,
} from '../../utils/arquivos'

export default defineEventHandler(async (event) => {
  exigirAdmin(event)

  const partes = await readMultipartFormData(event)
  const arquivo = partes?.find((p) => p.name === 'arquivo' && p.filename)

  if (!arquivo) {
    throw createError({ statusCode: 400, message: 'Nenhum arquivo enviado' })
  }

  const tipo = String(arquivo.type ?? '')
  const extensao = TIPOS_IMAGEM[tipo] ?? TIPOS_DOCUMENTO[tipo]

  if (!extensao) {
    throw createError({
      statusCode: 415,
      message: 'Formato não aceito. Use PNG, JPG, WebP, GIF, AVIF ou PDF.',
    })
  }

  const limite = TIPOS_DOCUMENTO[tipo] ? LIMITE_DOCUMENTO : LIMITE_IMAGEM
  if (arquivo.data.length > limite) {
    throw createError({
      statusCode: 413,
      message: `Arquivo acima do limite de ${Math.round(limite / 1024 / 1024)} MB`,
    })
  }

  // Nome previsível na parte legível, aleatório no fim: evita colisão e
  // impede que alguém adivinhe o caminho de um arquivo trocado.
  const base = gerarSlug(arquivo.filename!.replace(/\.[^.]+$/, '')) || 'arquivo'
  const nome = `${base}-${randomUUID().slice(0, 8)}.${extensao}`

  const destino = dirUploads()
  await mkdir(destino, { recursive: true })
  await writeFile(join(destino, nome), arquivo.data)

  return {
    caminho: `/uploads/${nome}`,
    nome,
    tamanho: arquivo.data.length,
    tipo,
  }
})
