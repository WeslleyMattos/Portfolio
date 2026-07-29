/**
 * Sementes do conteúdo — usadas só quando o JSON correspondente ainda não
 * existe no diretório de dados (primeiro boot, ou servidor novo).
 *
 * A construção mora em app/data/semente.ts porque o cliente também precisa
 * dela como fallback; aqui só reexportamos com o nome usado no servidor.
 */

import { perfilSemente, projetosSemente } from '../../app/data/semente'
import type { Metricas } from '../../app/data/tipos'

export const perfilPadrao = perfilSemente
export const projetosPadrao = projetosSemente

export function metricasPadrao(): Metricas {
  return {
    visualizacoes: 0,
    visitantes: 0,
    downloads: 0,
    porDia: {},
    atualizadoEm: new Date().toISOString(),
  }
}
