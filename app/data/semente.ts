/**
 * Constrói o conteúdo inicial a partir dos arquivos estáticos deste diretório.
 *
 * Usado em dois lugares:
 *  - no servidor, para semear os JSON no primeiro boot;
 *  - no cliente, como fallback caso /api/conteudo falhe — assim uma falha
 *    momentânea da API degrada para o conteúdo antigo em vez de página em branco.
 */

import { CONTACT } from './contact'
import {
  RESUME,
  SUMMARY,
  certifications,
  education,
  experience,
  languages,
  lifeSkills,
  setup,
  skillGroups,
  softStats,
  techStats,
} from './profile'
import { projects } from './projects'
import type { Perfil, Project } from './tipos'

export function perfilSemente(): Perfil {
  return {
    contato: { ...CONTACT },
    fotoPerfil: '/eu.png',
    resumo: SUMMARY,
    techStats: techStats.map((s) => ({ ...s })),
    softStats: softStats.map((s) => ({ ...s })),
    skillGroups: skillGroups.map((g) => ({ label: g.label, items: [...g.items] })),
    idiomas: languages.map((l) => ({ ...l })),
    lifeSkills: lifeSkills.map((h) => ({ ...h, bonuses: [...h.bonuses] })),
    setup: [...setup],
    experiencia: experience.map((e) => ({ ...e, highlights: [...e.highlights] })),
    formacao: education.map((f) => ({ ...f })),
    certificacoes: certifications.map((c) => ({ ...c })),
    curriculo: {
      disponivel: RESUME.available,
      arquivo: RESUME.path,
      nomeArquivo: RESUME.fileName,
      page: RESUME.page,
    },
  }
}

export function projetosSemente(): Project[] {
  return projects.map((p) => ({ ...p, images: [...p.images], tags: [...p.tags] }))
}
