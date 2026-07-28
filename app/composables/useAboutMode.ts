export type AboutMode = 'profissional' | 'criativo'

const STORAGE_KEY = 'portfolio:about-mode'

/**
 * Controla qual versão da página "Sobre" é exibida.
 *
 * A escolha fica no localStorage para o visitante não ter que decidir
 * de novo a cada visita — mas ele pode trocar quando quiser.
 */
export const useAboutMode = () => {
  // useState mantém o valor consistente entre servidor e cliente
  const mode = useState<AboutMode | null>('about-mode', () => null)
  const dialogOpen = useState<boolean>('about-mode-dialog', () => false)

  /** Lê a preferência salva; se não houver, abre o diálogo de escolha */
  const restore = () => {
    if (import.meta.server) return

    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved === 'profissional' || saved === 'criativo') {
      mode.value = saved
      dialogOpen.value = false
    } else {
      dialogOpen.value = true
    }
  }

  const setMode = (value: AboutMode) => {
    mode.value = value
    dialogOpen.value = false

    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, value)
    }
  }

  const toggleMode = () => {
    setMode(mode.value === 'criativo' ? 'profissional' : 'criativo')
  }

  /** Reabre o diálogo para o visitante escolher de novo */
  const openDialog = () => {
    dialogOpen.value = true
  }

  const closeDialog = () => {
    // Se ainda não escolheu nada, fechar assume o modo profissional
    if (!mode.value) setMode('profissional')
    else dialogOpen.value = false
  }

  return { mode, dialogOpen, restore, setMode, toggleMode, openDialog, closeDialog }
}
