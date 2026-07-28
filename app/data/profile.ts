/**
 * Conteúdo do perfil, compartilhado entre o Modo Profissional, o Modo Criativo
 * e a página do currículo.
 *
 * As notas de 0 a 20 vêm da ficha de RPG e são convertidas em porcentagem
 * no modo profissional — assim os dois modos nunca ficam desalinhados.
 */

export interface Stat {
  label: string
  /** Nota de 0 a 20 (escala de RPG) */
  value: number
}

/** Converte a nota de RPG (0–20) em porcentagem para as barras profissionais */
export const toPercent = (value: number) => Math.round((value / 20) * 100)

export const techStats: Stat[] = [
  { label: 'HTML / CSS', value: 14 },
  { label: 'Vue / Nuxt', value: 12 },
  { label: 'Tailwind CSS', value: 13 },
  { label: 'JavaScript', value: 10 },
  { label: 'Backend', value: 7 },
  { label: 'Banco de Dados', value: 6 },
]

export const softStats: Stat[] = [
  { label: 'Trabalho em Equipe', value: 17 },
  { label: 'Comunicação', value: 16 },
  { label: 'Inglês', value: 16 },
  { label: 'Resolução de Problemas', value: 15 },
  { label: 'Gestão de Tempo', value: 14 },
]

/** Resumo profissional — abre o currículo e o modo profissional */
export const SUMMARY =
  'Desenvolvedor Frontend especializado na criação de interfaces modernas, responsivas e performáticas, com foco em Vue.js, Nuxt 3 e Tailwind CSS. Experiência prática em projetos reais — de sistemas de gestão e painéis analíticos a landing pages de alta conversão. Atuei também no suporte técnico a sistemas SaaS, o que reforçou minha capacidade de resolver problemas e de me comunicar diretamente com clientes.'

/** Stack organizada por área, como no currículo */
export const skillGroups = [
  {
    label: 'Frontend',
    items: [
      'Vue.js',
      'Nuxt 3',
      'JavaScript',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'Nuxt UI',
    ],
  },
  {
    label: 'Backend e Infra',
    items: ['Node.js', 'Python', 'Django', 'MySQL', 'PostgreSQL', 'Docker', 'APIs REST'],
  },
  {
    label: 'Integrações',
    items: ['WhatsApp API', 'Mercado Pago', 'Gráficos interativos'],
  },
  {
    label: 'Ferramentas',
    items: ['Git', 'GitHub', 'VS Code', 'Animações CSS', 'Responsividade'],
  },
]

export const languages = [{ label: 'Inglês', level: 'Avançado' }]

/**
 * Habilidades "de vida" — usadas apenas no Modo Criativo,
 * onde viram perícias da ficha de RPG.
 */
export const lifeSkills = [
  {
    icon: '👨‍👦',
    category: 'Life Skill',
    name: 'Paternidade',
    description:
      'Experiência diária que desenvolve inteligência emocional e responsabilidade.',
    bonuses: ['+10 Paciência', '+15 Responsabilidade', '+20 Multitarefa'],
  },
  {
    icon: '🎸',
    category: 'Habilidade Artística',
    name: 'Tocar Violão',
    description:
      'Prática musical que estimula criatividade, foco e sensibilidade artística.',
    bonuses: ['+15 Criatividade', '+10 Concentração', '+5 Disciplina'],
  },
  {
    icon: '🎣',
    category: 'Habilidade de Sobrevivência',
    name: 'Pesca',
    description: 'Atividade que exige paciência, observação e controle emocional.',
    bonuses: ['+20 Paciência', '+10 Estratégia', '+10 Persistência'],
  },
  {
    icon: '🧠',
    category: 'Habilidade Passiva',
    name: 'Aprendizado Contínuo',
    description: 'Busca constante por evolução pessoal e técnica.',
    bonuses: ['+15 Adaptabilidade', '+10 Resolução de Problemas'],
  },
  {
    icon: '⚖️',
    category: 'Habilidade Passiva',
    name: 'Equilíbrio Vida & Trabalho',
    description: 'Capacidade de manter produtividade sem comprometer a vida pessoal.',
    bonuses: ['+10 Organização', '+10 Consistência'],
  },
]

/** Setup — usado apenas no Modo Criativo, como "equipamentos" */
export const setup = [
  'Aorus Elite B550m',
  'Ryzen 5 5600X',
  'RAM 32GB DDR4 3200MHz',
  'RTX Gigabyte 5060 OC 8GB',
  'M.2 NVMe 4.0 1TB',
  'Water Cooler 240mm',
  "2 Monitores LG 27'' 75Hz",
]

/* ------------------------------------------------------------------
   Experiência profissional
   ------------------------------------------------------------------ */

export interface ExperienceItem {
  role: string
  company: string
  period: string
  current?: boolean
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Desenvolvedor Frontend',
    company: 'Projetos Freelance',
    period: '2023 — Presente',
    current: true,
    highlights: [
      'Signals House Painel: painel analítico com gráficos interativos e dados em tempo real, em Nuxt 3, TypeScript e Docker.',
      'Signals House: landing page de produtos digitais focada em conversão, com Nuxt 3, Tailwind e Nuxt UI.',
      'Historic Bet: landing page para plataforma de apostas, com animações e UX voltada à conversão.',
      'Flashback Hamburgueria: sistema de pedidos com integração via WhatsApp, em HTML, Bootstrap, JavaScript, Node.js e MySQL.',
      'Shoy Doces: sistema de cardápio e pedidos integrado à WhatsApp API.',
    ],
  },
  {
    role: 'Analista de Suporte',
    company: 'Você Pede Softwares',
    period: 'Mar 2024 — Mar 2026',
    highlights: [
      'Suporte técnico especializado a sistema SaaS de gestão para bares e restaurantes.',
      'Atendimento ao cliente com foco em resolução ágil e comunicação clara.',
      'Análise de dados e apoio na identificação de melhorias de produto.',
      'Desenvolvi a landing page oficial da empresa com Nuxt 3, Tailwind e animações customizadas.',
    ],
  },
  {
    role: 'Operacional',
    company: 'Lincoln Smash Burguer',
    period: 'Ago 2022 — Mar 2024',
    highlights: [
      'Atuação em ambiente de alta demanda, desenvolvendo resiliência, trabalho em equipe e gestão de tempo.',
    ],
  },
]

/* ------------------------------------------------------------------
   Formação e certificações
   ------------------------------------------------------------------ */

export interface EducationItem {
  course: string
  institution: string
  period: string
}

export const education: EducationItem[] = [
  {
    course: 'Programador Web & Programador de Sistemas',
    institution: 'Senac Santa Catarina',
    period: 'Mar 2023 — Dez 2023',
  },
  {
    course: 'Jovem Programador',
    institution: 'Senac Santa Catarina',
    period: 'Concluído',
  },
  {
    course: 'Ensino Médio Completo',
    institution: '',
    period: 'Concluído',
  },
]

export interface CertificationItem {
  name: string
  issuer: string
  year: string
}

export const certifications: CertificationItem[] = [
  {
    name: 'Python Essentials',
    issuer: 'Cisco Networking Academy',
    year: 'Mai — Jul 2023',
  },
]

/* ------------------------------------------------------------------
   Currículo
   ------------------------------------------------------------------ */
export const RESUME = {
  available: true,
  path: '/curriculo-weslley-mattos.pdf',
  fileName: 'Curriculo-Weslley-Renan-Mattos.pdf',
  /** Versão navegável, também usada para gerar o PDF */
  page: '/curriculo',
} as const
