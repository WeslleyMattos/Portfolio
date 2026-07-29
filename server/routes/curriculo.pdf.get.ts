/**
 * Entrega o PDF do currículo contabilizando o download.
 *
 * Todo link de "baixar currículo" no site aponta para cá em vez de apontar
 * para o arquivo direto — é o que torna a métrica possível.
 */

import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { dirUploads } from '../utils/armazenamento'
import { nomeSeguro } from '../utils/arquivos'
import { lerPerfil } from '../utils/conteudo'
import { registrarDownload } from '../utils/metricas'

export default defineEventHandler(async (event) => {
  const { curriculo } = await lerPerfil()

  if (!curriculo?.disponivel || !curriculo.arquivo) {
    throw createError({ statusCode: 404, message: 'Currículo indisponível' })
  }

  await registrarDownload()

  // PDF enviado pelo painel: vive no diretório de dados.
  if (curriculo.arquivo.startsWith('/uploads/')) {
    const nome = curriculo.arquivo.slice('/uploads/'.length)
    if (!nomeSeguro(nome)) {
      throw createError({ statusCode: 400, message: 'Caminho inválido' })
    }

    const arquivo = join(dirUploads(), nome)
    try {
      await stat(arquivo)
    } catch {
      throw createError({ statusCode: 404, message: 'Arquivo não encontrado' })
    }

    setHeader(event, 'content-type', 'application/pdf')
    setHeader(
      event,
      'content-disposition',
      `attachment; filename="${curriculo.nomeArquivo || 'curriculo.pdf'}"`,
    )
    return readFile(arquivo)
  }

  // Ainda o PDF que veio junto com o build, servido pelo estático do Nitro.
  return sendRedirect(event, curriculo.arquivo, 302)
})
