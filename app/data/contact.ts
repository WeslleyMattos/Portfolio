/**
 * Dados de contato usados em vários pontos do site.
 * Centralizados aqui para não ficarem duplicados no markup.
 */

export const CONTACT = {
  name: 'Weslley Renan Mattos',
  fullName: 'Weslley Renan Bandeira Mattos',
  shortName: 'Weslley Renan',
  role: 'Desenvolvedor Frontend',
  headline: 'Vue · Nuxt · Tailwind CSS',
  location: 'Jaraguá do Sul — SC',
  email: 'weslleymattos2009@gmail.com',
  phone: '5547997271958',
  phoneDisplay: '(47) 99727-1958',
  site: 'weslleymattos.com.br',
  github: 'https://github.com/WeslleyMattos',
  linkedin: 'https://www.linkedin.com/in/weslley-mattos/',
} as const

export const WHATSAPP_URL = `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(
  'Olá, vi seu portfólio e gostaria de falar com você!',
)}`

export const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: CONTACT.linkedin,
    icon: 'bx bxl-linkedin',
    ariaLabel: 'Perfil no LinkedIn (abre em nova aba)',
    color: 'hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white',
    external: true,
  },
  {
    label: 'GitHub',
    href: CONTACT.github,
    icon: 'bx bxl-github',
    ariaLabel: 'Perfil no GitHub (abre em nova aba)',
    color: 'hover:border-white hover:bg-white hover:text-ink-950',
    external: true,
  },
  {
    label: 'WhatsApp',
    href: WHATSAPP_URL,
    icon: 'bx bxl-whatsapp',
    ariaLabel: 'Conversar no WhatsApp (abre em nova aba)',
    color: 'hover:border-[#25d366] hover:bg-[#25d366] hover:text-white',
    external: true,
  },
  {
    label: 'E-mail',
    href: `mailto:${CONTACT.email}`,
    icon: 'bx bx-envelope',
    ariaLabel: `Enviar e-mail para ${CONTACT.email}`,
    color: 'hover:border-accent-400 hover:bg-accent-500 hover:text-white',
    external: false,
  },
] as const
