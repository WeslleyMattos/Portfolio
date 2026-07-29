/**
 * Registra um acesso. Chamado pelo navegador a cada troca de página.
 *
 * Contar no servidor a cada request HTML seria mais simples, mas inflaria o
 * número com bots, health check e o próprio curl do deploy. Um beacon do
 * cliente conta navegador de verdade.
 */

import { randomUUID } from 'node:crypto'
import { registrarVisita } from '../../utils/metricas'

const COOKIE_VISITANTE = 'visitante'
const UM_ANO = 60 * 60 * 24 * 365

export default defineEventHandler(async (event) => {
  const existente = getCookie(event, COOKIE_VISITANTE)
  const visitanteNovo = !existente

  if (visitanteNovo) {
    // Identificador opaco e aleatório: serve só para separar visitante novo
    // de recorrente. Não guarda nada sobre a pessoa.
    setCookie(event, COOKIE_VISITANTE, randomUUID(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: !import.meta.dev,
      path: '/',
      maxAge: UM_ANO,
    })
  }

  await registrarVisita(visitanteNovo)
  return { ok: true }
})
