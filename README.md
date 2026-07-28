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
| Framework   | Nuxt 4.3 (SSR + pré-renderização das rotas) |
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

Geração estática (o site é totalmente pré-renderizável):

```bash
npm run generate
```

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
├── composables/
│   └── useAboutMode.ts      # Persistência do modo escolhido
├── data/                    # Contato, projetos e conteúdo do perfil
├── layouts/default.vue
└── pages/                   # index, sobre, projetos
public/                      # Imagens, robots.txt
server/routes/sitemap.xml.ts # Sitemap gerado no servidor
antigo/                      # Versão original em HTML puro (histórico)
```

Todo o conteúdo editável está em `app/data/` — não é preciso mexer no markup para
atualizar projetos, contatos ou competências.

## Variáveis de ambiente

| Variável               | Descrição                                    | Padrão                       |
| ---------------------- | -------------------------------------------- | ---------------------------- |
| `NUXT_PUBLIC_SITE_URL` | URL de produção, usada no SEO e no sitemap    | `https://weslleymattos.dev`  |

## Currículo

A rota `/curriculo` é uma folha A4 pronta para impressão, montada com os mesmos dados de
`app/data/profile.ts`. O PDF em `public/` é gerado a partir dela:

```bash
npm run curriculo
```

O servidor precisa estar rodando (`npm run dev`). Sempre que atualizar experiência,
formação ou competências, rode o comando de novo para o PDF acompanhar.

## Pendências

- [ ] Criar uma arte 1200x630 para `og-image.png` e apontar o SEO para ela em `app/app.vue`
      (hoje o preview de compartilhamento usa `eu.png`)
