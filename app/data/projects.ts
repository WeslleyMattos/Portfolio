export interface Project {
  id: number
  slug: string
  title: string
  /** Categoria curta usada como etiqueta no card */
  category: string
  /** Frase de uma linha exibida no topo do card */
  tagline: string
  description: string
  images: string[]
  tags: string[]
  /** Projetos em destaque ocupam o dobro de espaço na grade */
  featured?: boolean
  /** Link do projeto no ar, quando existir */
  url?: string
}

export const projects: Project[] = [
  {
    id: 5,
    slug: 'signals-house-painel',
    title: 'Signals House — Painel',
    category: 'Dashboard',
    tagline: 'Analytics em tempo real',
    description:
      'Painel analítico performático com gráficos interativos e visualização de dados em tempo real, containerizado com Docker.',
    images: [
      '/Signalspainel1.png',
      '/Signalspainel2.png',
      '/Signalspainel3.png',
      '/Signalspainel4.png',
      '/Signalspainel5.png',
    ],
    tags: ['Nuxt 3', 'TypeScript', 'Charts', 'APIs', 'Tailwind', 'Docker'],
    featured: true,
  },
  {
    id: 1,
    slug: 'flashback-hamburgueria',
    title: 'Flashback Hamburgueria',
    category: 'Sistema web',
    tagline: 'Pedidos e cardápio',
    description:
      'Sistema web para gerenciar pedidos e cardápio de uma hamburgueria, com integração dos pedidos via WhatsApp.',
    images: [
      '/flashbackpainel2.png',
      '/flashback2.png',
      '/flashbackpainel.png',
      '/flashback.png',
      '/flashbackpainel3.png',
      '/flashbackpainel4.png',
      '/flashbackpainel5.png',
    ],
    tags: ['HTML', 'JavaScript', 'Node.js', 'MySQL'],
    featured: true,
  },
  {
    id: 6,
    slug: 'historic-bet',
    title: 'Historic Bet',
    category: 'Landing page',
    tagline: 'Plataforma de apostas',
    description:
      'Landing page para plataforma de cassino, com design moderno, animações e foco na experiência do usuário.',
    images: [
      '/Historicbet1.png',
      '/Historicbet2.png',
      '/Historicbet3.png',
      '/Historicbet4.png',
      '/Historicbet5.png',
    ],
    tags: ['Nuxt 3', 'Tailwind', 'Nuxt UI', 'Charts', 'Animations'],
  },
  {
    id: 4,
    slug: 'signals-house',
    title: 'Signals House',
    category: 'Landing page',
    tagline: 'Foco em conversão',
    description:
      'Landing page para venda de produtos digitais, com design atraente e estrutura pensada para conversão.',
    images: [
      '/SignalsHouse.png',
      '/SignalsHouse2.png',
      '/SignalsHouse3.png',
      '/SignalsHouse4.png',
      '/SignalsHouse5.png',
    ],
    tags: ['Nuxt 3', 'Tailwind', 'Nuxt UI', 'JavaScript'],
  },
  {
    id: 3,
    slug: 'voce-pede-softwares',
    title: 'Você Pede Softwares',
    category: 'Landing page',
    tagline: 'Animações suaves',
    description:
      'Landing page responsiva com animações suaves e design moderno para apresentação de serviços.',
    images: ['/vocepede1.png', '/vocepede2.png', '/vocepede3.png', '/vocepede4.png'],
    tags: ['Nuxt 3', 'Tailwind', 'JavaScript', 'Animations'],
  },
  {
    id: 2,
    slug: 'shoy-doces',
    title: 'Shoy Doces',
    category: 'Sistema web',
    tagline: 'Cardápio digital',
    description:
      'Sistema web para gerenciar pedidos e cardápio de uma doceria, com envio dos pedidos direto pelo WhatsApp.',
    images: ['/shoy-doces1.png', '/shoy-doces2.png', '/shoy-doces3.png'],
    tags: ['HTML', 'Bootstrap', 'JavaScript', 'WhatsApp API'],
  },
]

/** Lista única de tecnologias, para os filtros da galeria */
export const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort((a, b) =>
  a.localeCompare(b, 'pt-BR'),
)
