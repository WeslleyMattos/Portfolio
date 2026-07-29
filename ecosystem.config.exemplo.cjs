/**
 * MODELO — copie para o servidor como `ecosystem.config.cjs`.
 *
 *   /www/wwwroot/weslleymattos.com.br/ecosystem.config.cjs
 *
 * Este arquivo NÃO vai para o repositório com valores reais: ele carrega a
 * senha do painel e o segredo de sessão. O `.gitignore` já bloqueia o nome
 * `ecosystem.config.cjs` — o que você versiona é só este exemplo.
 *
 * Ele também não é tocado pelo deploy: fica ao lado do `.output`, que é o
 * único diretório substituído a cada push.
 *
 * Para subir a primeira vez:
 *   cd /www/wwwroot/weslleymattos.com.br
 *   pm2 delete portfolio          # se já existir um processo antigo
 *   pm2 start ecosystem.config.cjs
 *   pm2 save
 */

module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: '.output/server/index.mjs',
      cwd: '/www/wwwroot/weslleymattos.com.br',
      instances: 1,
      // Modo fork, não cluster: os contadores de métrica vivem em memória e
      // em cluster cada processo teria a própria contagem.
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        HOST: '127.0.0.1',

        // Conteúdo do painel e uploads. Precisa ficar FORA do .output.
        NUXT_CONTEUDO_DIR: '/www/wwwroot/weslleymattos.com.br/dados',

        // Gere os dois com `npm run senha-admin` na sua máquina
        NUXT_ADMIN_SENHA_HASH: 'cole-o-hash-aqui',
        NUXT_ADMIN_SESSAO_SEGREDO: 'cole-o-segredo-aqui',

        NUXT_PUBLIC_SITE_URL: 'https://weslleymattos.com.br',
      },
    },
  ],
}
