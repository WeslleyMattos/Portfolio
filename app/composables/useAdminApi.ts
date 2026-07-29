/**
 * Chamadas do painel para a API administrativa.
 *
 * Centralizado para que toda tela trate erro do mesmo jeito: a mensagem que
 * o servidor devolve é a que aparece para o usuário, sem "algo deu errado".
 */

import type { Metricas, Perfil, Project } from '~/data/tipos'

export interface SerieDia {
  dia: string
  visitas: number
  downloads: number
}

/** Extrai a mensagem legível de um erro do $fetch */
export function mensagemDeErro(erro: unknown): string {
  const e = erro as { data?: { message?: string }; message?: string }
  return e?.data?.message || e?.message || 'Não foi possível completar a ação.'
}

export function useAdminApi() {
  const carregarPerfil = () => $fetch<Perfil>('/api/admin/perfil')

  const salvarPerfil = (perfil: Partial<Perfil>) =>
    $fetch<Perfil>('/api/admin/perfil', { method: 'PUT', body: perfil })

  const carregarProjetos = () => $fetch<Project[]>('/api/admin/projetos')

  const salvarProjetos = (projetos: Project[]) =>
    $fetch<Project[]>('/api/admin/projetos', { method: 'PUT', body: projetos })

  const carregarMetricas = () =>
    $fetch<{ totais: Metricas; serie: SerieDia[] }>('/api/admin/metricas')

  const enviarArquivo = (arquivo: File) => {
    const dados = new FormData()
    dados.append('arquivo', arquivo)
    return $fetch<{ caminho: string; nome: string; tamanho: number }>('/api/admin/upload', {
      method: 'POST',
      body: dados,
    })
  }

  const entrar = (senha: string) =>
    $fetch<{ ok: boolean }>('/api/admin/login', { method: 'POST', body: { senha } })

  const sair = () => $fetch('/api/admin/logout', { method: 'POST' })

  return {
    carregarPerfil,
    salvarPerfil,
    carregarProjetos,
    salvarProjetos,
    carregarMetricas,
    enviarArquivo,
    entrar,
    sair,
  }
}
