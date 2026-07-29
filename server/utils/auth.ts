/**
 * Autenticação do painel: um único administrador, senha guardada como hash
 * scrypt e sessão em cookie assinado.
 *
 * Sem dependência externa de propósito — `node:crypto` já traz scrypt e HMAC,
 * e um portfólio não justifica arrastar uma biblioteca de auth junto.
 *
 * A senha em texto puro nunca é gravada em lugar nenhum: o hash vem da env
 * NUXT_ADMIN_SENHA_HASH, gerada por `npm run senha-admin`.
 */

import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from 'node:crypto'
import { promisify } from 'node:util'
import type { H3Event } from 'h3'

const scrypt = promisify(scryptCallback) as (
  senha: string | Buffer,
  sal: string | Buffer,
  tamanho: number,
) => Promise<Buffer>

const NOME_COOKIE = 'admin_sessao'
const DURACAO_SESSAO_MS = 1000 * 60 * 60 * 12 // 12 horas

/* ------------------------------------------------------------------ senha */

export async function gerarHashSenha(senha: string): Promise<string> {
  const sal = randomBytes(16).toString('hex')
  const derivada = await scrypt(senha, sal, 64)
  return `scrypt$${sal}$${derivada.toString('hex')}`
}

export async function conferirSenha(senha: string, hashGuardado: string): Promise<boolean> {
  const partes = hashGuardado.split('$')
  if (partes.length !== 3 || partes[0] !== 'scrypt') return false

  const [, sal, esperado] = partes
  const derivada = await scrypt(senha, sal!, 64)
  const esperadoBuf = Buffer.from(esperado!, 'hex')

  // Comprimentos diferentes fazem timingSafeEqual lançar, então checa antes
  if (esperadoBuf.length !== derivada.length) return false
  return timingSafeEqual(esperadoBuf, derivada)
}

/* ---------------------------------------------------------------- sessão */

function segredo(): string {
  const { adminSessaoSegredo } = useRuntimeConfig()
  const valor = String(adminSessaoSegredo ?? '')
  if (!valor) {
    throw createError({
      statusCode: 500,
      message: 'NUXT_ADMIN_SESSAO_SEGREDO não configurado no servidor',
    })
  }
  return valor
}

function assinar(payload: string): string {
  return createHmac('sha256', segredo()).update(payload).digest('hex')
}

export function criarSessao(event: H3Event): void {
  const expiraEm = String(Date.now() + DURACAO_SESSAO_MS)
  const valor = `${expiraEm}.${assinar(expiraEm)}`

  setCookie(event, NOME_COOKIE, valor, {
    httpOnly: true,
    sameSite: 'strict',
    // Em dev o site roda em http://localhost, onde secure impediria o cookie
    secure: !import.meta.dev,
    path: '/',
    maxAge: DURACAO_SESSAO_MS / 1000,
  })
}

export function encerrarSessao(event: H3Event): void {
  deleteCookie(event, NOME_COOKIE, { path: '/' })
}

export function sessaoValida(event: H3Event): boolean {
  const cookie = getCookie(event, NOME_COOKIE)
  if (!cookie) return false

  const [expiraEm, assinatura] = cookie.split('.')
  if (!expiraEm || !assinatura) return false

  const esperada = Buffer.from(assinar(expiraEm), 'hex')
  const recebida = Buffer.from(assinatura, 'hex')
  if (esperada.length !== recebida.length) return false
  if (!timingSafeEqual(esperada, recebida)) return false

  return Number(expiraEm) > Date.now()
}

/** Usada por toda rota sob /api/admin */
export function exigirAdmin(event: H3Event): void {
  if (!sessaoValida(event)) {
    throw createError({ statusCode: 401, message: 'Não autenticado' })
  }
}

/* --------------------------------------------------- limite de tentativas */

const tentativas = new Map<string, { total: number; ate: number }>()
const MAX_TENTATIVAS = 5
const JANELA_MS = 1000 * 60 * 10

/**
 * Trava por IP após 5 erros em 10 minutos. Em memória de propósito: o
 * processo é único (PM2 sem cluster) e o custo de reiniciar zerando o
 * contador é irrelevante para o tamanho deste site.
 */
export function registrarTentativa(ip: string, sucesso: boolean): void {
  if (sucesso) {
    tentativas.delete(ip)
    return
  }
  const atual = tentativas.get(ip)
  if (!atual || atual.ate < Date.now()) {
    tentativas.set(ip, { total: 1, ate: Date.now() + JANELA_MS })
    return
  }
  atual.total += 1
}

export function bloqueado(ip: string): boolean {
  const atual = tentativas.get(ip)
  if (!atual) return false
  if (atual.ate < Date.now()) {
    tentativas.delete(ip)
    return false
  }
  return atual.total >= MAX_TENTATIVAS
}

export function ipDoEvento(event: H3Event): string {
  return getRequestIP(event, { xForwardedFor: true }) ?? 'desconhecido'
}
