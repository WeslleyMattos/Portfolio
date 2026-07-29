import { exigirAdmin } from '../../utils/auth'
import { lerPerfil } from '../../utils/conteudo'

export default defineEventHandler(async (event) => {
  exigirAdmin(event)
  return lerPerfil()
})
