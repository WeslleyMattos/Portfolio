/**
 * Gera o hash da senha do painel e um segredo de sessão.
 *
 * Uso:  npm run senha-admin
 *
 * A senha é lida do terminal sem eco e nunca é gravada em disco — o que sai
 * daqui é só o hash, que é o que vai para a variável de ambiente.
 */

import { randomBytes, scrypt as scryptCallback } from 'node:crypto'
import { promisify } from 'node:util'
import { createInterface } from 'node:readline'
import process from 'node:process'

const scrypt = promisify(scryptCallback)

function perguntarSenha(pergunta) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true })

    // Silencia o eco para a senha não ficar visível nem no histórico do terminal
    const escrever = rl._writeToOutput?.bind(rl)
    let silenciar = false
    rl._writeToOutput = (texto) => {
      if (!silenciar) escrever?.(texto)
    }

    rl.question(pergunta, (resposta) => {
      rl._writeToOutput = escrever
      rl.output.write('\n')
      rl.close()
      resolve(resposta)
    })
    silenciar = true
  })
}

const senha = await perguntarSenha('Senha do painel: ')

if (!senha || senha.length < 8) {
  console.error('\nA senha precisa ter pelo menos 8 caracteres.')
  process.exit(1)
}

const sal = randomBytes(16).toString('hex')
const derivada = await scrypt(senha, sal, 64)
const hash = `scrypt$${sal}$${derivada.toString('hex')}`
const segredoSessao = randomBytes(32).toString('hex')

console.log(`
Pronto. Configure estas duas variáveis no servidor (PM2):

NUXT_ADMIN_SENHA_HASH=${hash}
NUXT_ADMIN_SESSAO_SEGREDO=${segredoSessao}

Guarde o segredo de sessão: trocá-lo desloga qualquer sessão aberta.
Para desenvolvimento local, coloque as duas num arquivo .env na raiz.
`)
