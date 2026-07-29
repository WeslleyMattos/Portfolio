/**
 * Fonte única do conteúdo do site em runtime.
 *
 * Antes cada componente importava direto de `~/data/*`, o que congelava o
 * conteúdo no build. Agora tudo passa por /api/conteudo, que lê os JSON
 * editados pelo painel — por isso uma alteração salva aparece na hora.
 *
 * A chave 'conteudo' faz o Nuxt buscar uma vez por requisição e compartilhar
 * o resultado entre todos os componentes, inclusive no SSR.
 */

import { perfilSemente, projetosSemente } from '~/data/semente'
import type { ConteudoPublico } from '~/data/tipos'

export function useConteudo() {
  const { data, refresh, status } = useAsyncData<ConteudoPublico>(
    'conteudo',
    () => $fetch<ConteudoPublico>('/api/conteudo'),
    {
      // Se a API falhar, o site cai no conteúdo estático em vez de quebrar
      default: () => ({ perfil: perfilSemente(), projetos: projetosSemente() }),
    },
  )

  const perfil = computed(() => data.value?.perfil ?? perfilSemente())
  const projetos = computed(() => data.value?.projetos ?? [])
  const contato = computed(() => perfil.value.contato)

  /** Links sociais derivados do contato — mudam junto quando você edita */
  const whatsappUrl = computed(
    () =>
      `https://wa.me/${contato.value.phone}?text=${encodeURIComponent(
        'Olá, vi seu portfólio e gostaria de falar com você!',
      )}`,
  )

  const linksSociais = computed(() => [
    {
      label: 'LinkedIn',
      href: contato.value.linkedin,
      icon: 'bx bxl-linkedin',
      ariaLabel: 'Perfil no LinkedIn (abre em nova aba)',
      color: 'hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white',
      external: true,
    },
    {
      label: 'GitHub',
      href: contato.value.github,
      icon: 'bx bxl-github',
      ariaLabel: 'Perfil no GitHub (abre em nova aba)',
      color: 'hover:border-white hover:bg-white hover:text-ink-950',
      external: true,
    },
    {
      label: 'WhatsApp',
      href: whatsappUrl.value,
      icon: 'bx bxl-whatsapp',
      ariaLabel: 'Conversar no WhatsApp (abre em nova aba)',
      color: 'hover:border-[#25d366] hover:bg-[#25d366] hover:text-white',
      external: true,
    },
    {
      label: 'E-mail',
      href: `mailto:${contato.value.email}`,
      icon: 'bx bx-envelope',
      ariaLabel: `Enviar e-mail para ${contato.value.email}`,
      color: 'hover:border-accent-400 hover:bg-accent-500 hover:text-white',
      external: false,
    },
  ])

  return { perfil, projetos, contato, whatsappUrl, linksSociais, refresh, status }
}

/** Converte a nota de RPG (0–20) em porcentagem para as barras profissionais */
export const paraPorcentagem = (valor: number) => Math.round((valor / 20) * 100)
