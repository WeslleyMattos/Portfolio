# Portfólio — Weslley Renan Mattos

Portfólio pessoal de desenvolvedor frontend, construído com **Nuxt 4**, **Vue 3** e
**Tailwind CSS 4**.

O diferencial fica na página **Sobre**, que oferece duas leituras do mesmo perfil e deixa
o visitante escolher:

- **Modo Profissional** — currículo completo: experiência, competências, stack e formação.
- **Modo Criativo** — o perfil como uma ficha de personagem de RPG, com atributos,
  perícias e um dado de 20 lados interativo em CSS 3D.

A escolha fica salva no navegador e pode ser trocada a qualquer momento.

## Stack

| Camada      | Tecnologia                                  |
| ----------- | ------------------------------------------- |
| Framework   | Nuxt 4.3 (SSR)                              |
| UI          | Vue 3, Nuxt UI, Tailwind CSS 4              |
| Imagens     | `@nuxt/image` com IPX (conversão para WebP) |
| Ícones      | Boxicons (pacote local, sem CDN)            |
| Animações   | CSS + typed.js                              |
| Estilo      | SCSS apenas no dado de RPG (`Dice.vue`)     |

## Como rodar

Requer **Node 20.19+** ou **22.12+**.

```bash
npm install --legacy-peer-deps
```

> A flag `--legacy-peer-deps` contorna um bug do npm 10 ao resolver a árvore de peers do
> Nuxt 4. Com npm 11+ ela deixa de ser necessária.

Servidor de desenvolvimento em `http://localhost:3010`:

```bash
npm run dev
```

Build de produção e preview local:

```bash
npm run build
npm run preview
```

> **Geração estática não é mais suportada.** O conteúdo passou a ser lido em runtime para
> que o painel admin funcione sem rebuild — um site estático congelaria os dados no build
> e as edições nunca apareceriam. O `npm run generate` continua no `package.json`, mas
> geraria um site com o conteúdo da semente.

## Estrutura

```
app/
├── app.vue                  # SEO global e dados estruturados (JSON-LD)
├── error.vue                # Página 404 / erro
├── assets/css/tailwind.css  # Design tokens e utilitários próprios
├── components/
│   ├── Header.vue           # Navegação fixa, acessível
│   ├── Footer.vue
│   ├── about/               # Diálogo de modo + os dois perfis
│   ├── projects/            # Card da galeria e lightbox
│   └── rpg/                 # Componentes da ficha de personagem
│   └── admin/               # Formulários do painel
├── composables/
│   ├── useAboutMode.ts      # Persistência do modo escolhido
│   ├── useConteudo.ts       # Conteúdo do site vindo da API
│   └── useAdminApi.ts       # Chamadas do painel
├── data/                    # Semente do conteúdo + tipos
├── layouts/                 # default.vue e admin.vue
├── middleware/admin.ts      # Protege as rotas do painel
├── plugins/                 # Beacon de métricas
└── pages/
    ├── index, sobre, projetos, curriculo
    └── admin/               # login, métricas, perfil, currículo, projetos
public/                      # Imagens, robots.txt
server/
├── api/                     # Conteúdo público + rotas do painel
├── routes/                  # sitemap.xml, /uploads, /curriculo.pdf
└── utils/                   # Armazenamento, auth, métricas
antigo/                      # Versão original em HTML puro (histórico)
```

Os arquivos em `app/data/` **não são mais a fonte de verdade em produção** — viraram a
*semente*. No primeiro boot o servidor grava esse conteúdo como JSON no diretório de
dados e passa a ler de lá, que é o que o painel edita. Eles continuam servindo de
fallback no cliente caso a API falhe.

## Painel admin

Fica em `/admin` e permite editar foto de perfil, currículo e projetos, além de mostrar
métricas de acesso — tudo sem rebuild.

### Como funciona

O conteúdo vive em JSON num diretório **fora do `.output`**, porque o deploy substitui o
`.output` inteiro a cada push e levaria os dados junto:

```
/www/wwwroot/weslleymattos.com.br/
├── .output/          <- trocado a cada deploy
├── dados/            <- sobrevive aos deploys
│   ├── perfil.json
│   ├── projetos.json
│   ├── metricas.json
│   └── uploads/      <- fotos e PDF enviados pelo painel
└── ecosystem.config.cjs
```

As escritas são atômicas (grava num temporário e renomeia) e serializadas por arquivo,
então uma queda no meio da gravação não deixa JSON truncado.

### Configurar

Gere a senha e o segredo de sessão:

```bash
npm run senha-admin
```

A senha é lida sem eco e nunca é gravada em disco — o comando devolve só o hash scrypt.
Copie `ecosystem.config.exemplo.cjs` para o servidor como `ecosystem.config.cjs`, cole os
dois valores e suba com `pm2 start ecosystem.config.cjs`.

Para desenvolver local, ponha as variáveis num `.env` na raiz.

### Métricas

Visitas são contadas por um beacon no cliente, não por requisição no servidor — assim
bots, health check e o `curl` de verificação do deploy não entram na conta. Acessos ao
próprio `/admin` são ignorados. Os downloads são contados na rota `/curriculo.pdf`, que
contabiliza antes de entregar o arquivo.

Os contadores ficam em memória e são gravados em disco com 3 segundos de atraso. Um
restart pode perder os últimos segundos de contagem — trade-off deliberado para não
gravar em disco a cada acesso.

### O que o painel ainda não edita

As perícias e equipamentos do **Modo Criativo** (`lifeSkills` e `setup`) continuam vindo
de `app/data/profile.ts`. Eles são preservados no JSON e podem ser editados à mão lá, mas
ainda não têm tela.

## Variáveis de ambiente

| Variável                    | Descrição                                        | Padrão                          |
| --------------------------- | ------------------------------------------------ | ------------------------------- |
| `NUXT_PUBLIC_SITE_URL`      | URL de produção, usada no SEO e no sitemap        | `https://weslleymattos.com.br`  |
| `NUXT_CONTEUDO_DIR`         | Onde ficam os JSON e os uploads                   | `./dados`                       |
| `NUXT_ADMIN_SENHA_HASH`     | Hash scrypt da senha do painel                    | — (sem ele o login fica off)    |
| `NUXT_ADMIN_SESSAO_SEGREDO` | Segredo que assina o cookie de sessão             | — (obrigatório para o painel)   |

## Deploy

Push na `main` dispara `.github/workflows/deploy.yml`: build no runner, envio do
`.output` por rsync, troca atômica no servidor, `pm2 restart`, verificação de que o site
respondeu 200 e rollback automático se não respondeu.

O build roda no GitHub Actions e não na VPS de propósito — o `.output` do Nitro é
autocontido, então o servidor não precisa de `node_modules` nem aguenta o pico de RAM do
Vite ao lado dos outros sites.

Secrets necessários: `SSH_HOST`, `SSH_USER`, `SSH_KEY` e, se a porta não for 22,
`SSH_PORT`.

## Currículo

A rota `/curriculo` é uma folha A4 pronta para impressão, montada com os dados do painel.
O PDF é gerado a partir dela:

```bash
npm run curriculo
```

O servidor precisa estar rodando (`npm run dev`). Depois envie o arquivo pelo painel, em
**Currículo → Enviar novo PDF** — o download público passa por `/curriculo.pdf`, que é o
que permite contar os downloads.

## Pendências

- [ ] Criar uma arte 1200x630 para `og-image.png` e apontar o SEO para ela em `app/app.vue`
      (hoje o preview de compartilhamento usa `eu.png`)
