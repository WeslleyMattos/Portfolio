/**
 * Contagem de acessos e de downloads do currículo.
 *
 * Gravar em disco a cada requisição seria desperdício e ainda abriria janela
 * de corrupção sob concorrência. Então os contadores vivem em memória e são
 * descarregados em disco com atraso curto (debounce), de forma atômica.
 *
 * O processo é único (PM2 sem modo cluster), então um contador em memória é
 * consistente. Em troca, um restart pode perder os últimos segundos de
 * contagem — trade-off aceitável para métrica de portfólio.
 */

import type { Metricas } from '../../app/data/tipos'
import { ARQUIVO_METRICAS, gravarJson, lerJson } from './armazenamento'
import { metricasPadrao } from './padroes'

const ATRASO_GRAVACAO_MS = 3000

let cache: Metricas | null = null
let gravacaoAgendada: ReturnType<typeof setTimeout> | null = null

async function carregar(): Promise<Metricas> {
  if (!cache) {
    cache = await lerJson<Metricas>(ARQUIVO_METRICAS, metricasPadrao)
    // Blinda contra um JSON antigo sem os campos novos
    cache.porDia ??= {}
    cache.visualizacoes ??= 0
    cache.visitantes ??= 0
    cache.downloads ??= 0
  }
  return cache
}

function agendarGravacao(): void {
  if (gravacaoAgendada) return
  gravacaoAgendada = setTimeout(() => {
    gravacaoAgendada = null
    if (cache) {
      cache.atualizadoEm = new Date().toISOString()
      void gravarJson(ARQUIVO_METRICAS, cache)
    }
  }, ATRASO_GRAVACAO_MS)
  // Não segura o processo vivo só por causa de um flush pendente
  gravacaoAgendada.unref?.()
}

function hoje(): string {
  return new Date().toISOString().slice(0, 10)
}

function diaAtual(m: Metricas) {
  const chave = hoje()
  m.porDia[chave] ??= { visitas: 0, downloads: 0 }
  return m.porDia[chave]!
}

export async function registrarVisita(visitanteNovo: boolean): Promise<void> {
  const m = await carregar()
  m.visualizacoes += 1
  if (visitanteNovo) m.visitantes += 1
  diaAtual(m).visitas += 1
  agendarGravacao()
}

export async function registrarDownload(): Promise<void> {
  const m = await carregar()
  m.downloads += 1
  diaAtual(m).downloads += 1
  agendarGravacao()
}

export async function lerMetricas(): Promise<Metricas> {
  return { ...(await carregar()) }
}

/**
 * Série dos últimos N dias, já preenchida com zeros nos dias sem acesso —
 * o gráfico do painel precisa de continuidade, não de buracos.
 */
export async function serieRecente(dias = 30) {
  const m = await carregar()
  const saida: Array<{ dia: string; visitas: number; downloads: number }> = []
  const base = new Date()

  for (let i = dias - 1; i >= 0; i--) {
    const d = new Date(base)
    d.setDate(base.getDate() - i)
    const chave = d.toISOString().slice(0, 10)
    const registro = m.porDia[chave]
    saida.push({
      dia: chave,
      visitas: registro?.visitas ?? 0,
      downloads: registro?.downloads ?? 0,
    })
  }
  return saida
}
