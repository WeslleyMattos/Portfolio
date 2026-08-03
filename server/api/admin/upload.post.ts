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
  LADO_MAXIMO,
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

  // Imagens enviadas não passam pelo @nuxt/image: o IPX só enxerga o que
  // está dentro do .output, e os uploads vivem fora dele de propósito. Então
  // a otimização acontece aqui, uma vez, em vez de a cada requisição.
  let dados = arquivo.data
  let extensaoFinal = extensao
  let otimizada = false

  if (TIPOS_IMAGEM[tipo]) {
    const resultado = await otimizarImagem(arquivo.data)
    if (resultado) {
      dados = resultado
      extensaoFinal = 'webp'
      otimizada = true
    }
  }

  // Nome previsível na parte legível, aleatório no fim: evita colisão e
  // impede que alguém adivinhe o caminho de um arquivo trocado.
  const base = gerarSlug(arquivo.filename!.replace(/\.[^.]+$/, '')) || 'arquivo'
  const nome = `${base}-${randomUUID().slice(0, 8)}.${extensaoFinal}`

  const destino = dirUploads()
  await mkdir(destino, { recursive: true })
  await writeFile(join(destino, nome), dados)

  return {
    caminho: `/uploads/${nome}`,
    nome,
    tamanho: dados.length,
    tamanhoOriginal: arquivo.data.length,
    otimizada,
    tipo: otimizada ? 'image/webp' : tipo,
  }
})

/**
 * Redimensiona e converte para WebP.
 *
 * O sharp é importado sob demanda e a falha é tolerada: no Windows o binário
 * nativo costuma não estar disponível, e nesse caso é melhor guardar o
 * original do que recusar o upload. Em produção (Linux) ele existe, porque o
 * próprio @nuxt/image depende dele.
 */
async function otimizarImagem(entrada: Buffer): Promise<Buffer | null> {
  try {
    const sharp = (await import('sharp')).default
    return await sharp(entrada)
      // withoutEnlargement evita esticar uma imagem menor que o limite
      .resize(LADO_MAXIMO, LADO_MAXIMO, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer()
  } catch (erro) {
    console.warn('[upload] sharp indisponivel, guardando original:', (erro as Error).message)
    return null
  }
}
