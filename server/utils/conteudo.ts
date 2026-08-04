/**
 * Acesso ao conteúdo editável. As rotas nunca falam com o armazenamento
 * diretamente — passam por aqui, onde ficam a semeadura e a validação.
 */

import type { Perfil, Project } from '../../app/data/tipos'
import {
  ARQUIVO_PERFIL,
  ARQUIVO_PROJETOS,
  gravarJson,
  lerJson,
} from './armazenamento'
import { perfilPadrao, projetosPadrao } from './padroes'

export function lerPerfil(): Promise<Perfil> {
  return lerJson<Perfil>(ARQUIVO_PERFIL, perfilPadrao)
}

export function lerProjetos(): Promise<Project[]> {
  return lerJson<Project[]>(ARQUIVO_PROJETOS, projetosPadrao)
}

export async function gravarPerfil(perfil: Perfil): Promise<Perfil> {
  // Mescla sobre o padrão para que um payload parcial nunca derrube um campo
  // inteiro do site — o admin edita uma seção por vez.
  const atual = await lerPerfil()
  const agora = new Date().toISOString()

  const novo: Perfil = {
    ...atual,
    ...perfil,
    contato: { ...atual.contato, ...perfil.contato },
    curriculo: { ...atual.curriculo, ...perfil.curriculo },
    atualizadoEm: agora,
  }

  // Carimba o envio quando o arquivo muda. Comparar esta data com a de
  // atualizacao do perfil e o que permite ao painel avisar que o PDF ficou
  // para tras — o PDF e um arquivo separado e nao acompanha as edicoes.
  if (novo.curriculo.arquivo !== atual.curriculo.arquivo) {
    novo.curriculo.enviadoEm = agora
  }

  await gravarJson(ARQUIVO_PERFIL, novo)
  return novo
}

export async function gravarProjetos(projetos: Project[]): Promise<Project[]> {
  await gravarJson(ARQUIVO_PROJETOS, projetos)
  return projetos
}

/** Próximo id livre, para não depender do cliente mandar um id correto */
export function proximoId(projetos: Project[]): number {
  return projetos.reduce((maior, p) => Math.max(maior, p.id), 0) + 1
}

/** Slug em minúsculas, sem acento e sem caractere especial */
export function gerarSlug(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
