import { sessaoValida } from '../../utils/auth'

/** Usada pelo middleware de rota para saber se já há sessão ativa. */
export default defineEventHandler((event) => ({
  autenticado: sessaoValida(event),
}))
