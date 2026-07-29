import {
  bloqueado,
  conferirSenha,
  criarSessao,
  ipDoEvento,
  registrarTentativa,
} from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const ip = ipDoEvento(event)

  if (bloqueado(ip)) {
    throw createError({
      statusCode: 429,
      message: 'Muitas tentativas. Tente novamente em alguns minutos.',
    })
  }

  const { senha } = await readBody<{ senha?: string }>(event)
  const { adminSenhaHash } = useRuntimeConfig()

  if (!adminSenhaHash) {
    throw createError({
      statusCode: 500,
      message: 'Painel sem senha configurada. Defina NUXT_ADMIN_SENHA_HASH.',
    })
  }

  const ok = typeof senha === 'string' && (await conferirSenha(senha, String(adminSenhaHash)))
  registrarTentativa(ip, ok)

  if (!ok) {
    throw createError({ statusCode: 401, message: 'Senha incorreta' })
  }

  criarSessao(event)
  return { ok: true }
})
