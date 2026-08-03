/** Regras compartilhadas de upload e de entrega de arquivos enviados. */

export const TIPOS_IMAGEM: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
}

export const TIPOS_DOCUMENTO: Record<string, string> = {
  'application/pdf': 'pdf',
}

export const LIMITE_IMAGEM = 8 * 1024 * 1024 // 8 MB
export const LIMITE_DOCUMENTO = 15 * 1024 * 1024 // 15 MB

/**
 * Maior lado de uma imagem enviada, em pixels.
 *
 * 1600 cobre a maior renderização do site (a foto da home em telas retina)
 * com folga, e derruba drasticamente o peso: uma foto de celular de 4000px
 * e 2 MB sai daqui com algumas dezenas de KB.
 */
export const LADO_MAXIMO = 1600

/** Extensão -> content-type, para servir de volta o que foi gravado */
export const CONTENT_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
  pdf: 'application/pdf',
}

/**
 * Só aceita nomes que este servidor mesmo gerou. Qualquer coisa com barra,
 * `..` ou caractere fora do conjunto é recusada — é a barreira contra
 * path traversal na rota que serve os uploads.
 */
export function nomeSeguro(nome: string): boolean {
  return /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,120}$/.test(nome) && !nome.includes('..')
}

export function extensaoDe(nome: string): string {
  const partes = nome.split('.')
  return partes.length > 1 ? partes.pop()!.toLowerCase() : ''
}
