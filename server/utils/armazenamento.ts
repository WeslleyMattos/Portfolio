/**
 * Persistência em JSON num diretório fora do bundle.
 *
 * O deploy substitui o `.output` inteiro a cada push, então nada que precise
 * sobreviver pode morar lá dentro. Este módulo concentra o acesso ao diretório
 * de dados (configurável por NUXT_CONTEUDO_DIR) e garante duas coisas:
 *
 *  - escrita atômica (grava num temporário e renomeia), para que uma queda no
 *    meio da gravação nunca deixe um JSON truncado no lugar do bom;
 *  - serialização por arquivo, para que duas requisições simultâneas não
 *    sobrescrevam uma à outra.
 */

import { access, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { randomUUID } from 'node:crypto'

export function dirConteudo(): string {
  const { conteudoDir } = useRuntimeConfig()
  return resolve(conteudoDir as string)
}

export function dirUploads(): string {
  return join(dirConteudo(), 'uploads')
}

export async function existe(caminho: string): Promise<boolean> {
  try {
    await access(caminho)
    return true
  } catch {
    return false
  }
}

/** Uma fila por arquivo: a próxima escrita só começa quando a anterior termina */
const filas = new Map<string, Promise<void>>()

async function escrever(arquivo: string, dados: unknown): Promise<void> {
  const dir = dirConteudo()
  await mkdir(dir, { recursive: true })

  const caminho = join(dir, arquivo)
  const temporario = `${caminho}.${randomUUID()}.tmp`

  await writeFile(temporario, JSON.stringify(dados, null, 2), 'utf8')
  await rename(temporario, caminho)
}

export function gravarJson(arquivo: string, dados: unknown): Promise<void> {
  const anterior = filas.get(arquivo) ?? Promise.resolve()
  // O catch evita que uma falha anterior trave a fila para sempre
  const atual = anterior.catch(() => {}).then(() => escrever(arquivo, dados))
  filas.set(arquivo, atual)
  return atual
}

/**
 * Lê o JSON; se ainda não existir, grava a semente e devolve ela.
 * Se o arquivo estiver corrompido, guarda uma cópia para inspeção em vez de
 * apagar — perder o conteúdo em silêncio seria pior que o erro original.
 */
export async function lerJson<T>(arquivo: string, semente: () => T): Promise<T> {
  const caminho = join(dirConteudo(), arquivo)

  if (!(await existe(caminho))) {
    const inicial = semente()
    await gravarJson(arquivo, inicial)
    return inicial
  }

  try {
    return JSON.parse(await readFile(caminho, 'utf8')) as T
  } catch {
    await rename(caminho, `${caminho}.corrompido-${Date.now()}`).catch(() => {})
    const inicial = semente()
    await gravarJson(arquivo, inicial)
    return inicial
  }
}

export const ARQUIVO_PERFIL = 'perfil.json'
export const ARQUIVO_PROJETOS = 'projetos.json'
export const ARQUIVO_METRICAS = 'metricas.json'
