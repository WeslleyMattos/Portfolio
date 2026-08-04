/**
 * Formato do conteúdo editável em runtime.
 *
 * Os arquivos deste diretório deixaram de ser a fonte de verdade em produção:
 * agora eles são a *semente*. No primeiro boot o servidor grava esses valores
 * em JSON no diretório de dados e passa a ler de lá, para que o painel admin
 * consiga editar sem precisar de rebuild.
 */

import type { Stat, ExperienceItem, EducationItem, CertificationItem } from './profile'
import type { Project } from './projects'

export type { Stat, ExperienceItem, EducationItem, CertificationItem, Project }

export interface Contato {
  name: string
  fullName: string
  shortName: string
  role: string
  headline: string
  location: string
  email: string
  phone: string
  phoneDisplay: string
  site: string
  github: string
  linkedin: string
}

export interface GrupoSkill {
  label: string
  items: string[]
}

export interface Idioma {
  label: string
  level: string
}

export interface LifeSkill {
  icon: string
  category: string
  name: string
  description: string
  bonuses: string[]
}

export interface Curriculo {
  disponivel: boolean
  /** Caminho servido pelo Nitro; o arquivo real vive no diretório de dados */
  arquivo: string
  nomeArquivo: string
  page: string
  /** Quando o PDF atual foi enviado — usado para detectar PDF desatualizado */
  enviadoEm?: string
}

export interface Perfil {
  contato: Contato
  /** Caminho da foto: '/eu.png' (semente) ou '/uploads/<arquivo>' (enviada) */
  fotoPerfil: string
  resumo: string
  techStats: Stat[]
  softStats: Stat[]
  skillGroups: GrupoSkill[]
  idiomas: Idioma[]
  lifeSkills: LifeSkill[]
  setup: string[]
  experiencia: ExperienceItem[]
  formacao: EducationItem[]
  certificacoes: CertificationItem[]
  curriculo: Curriculo
  /** Última gravação do perfil, seja qual for o campo */
  atualizadoEm?: string
}

export interface MetricasDia {
  visitas: number
  downloads: number
}

export interface Metricas {
  /** Total de carregamentos de página */
  visualizacoes: number
  /** Navegadores distintos, contados por cookie de visitante */
  visitantes: number
  downloads: number
  /** Série diária, chaveada por AAAA-MM-DD */
  porDia: Record<string, MetricasDia>
  atualizadoEm: string
}

/** Resposta pública consumida pelas páginas do site */
export interface ConteudoPublico {
  perfil: Perfil
  projetos: Project[]
}
