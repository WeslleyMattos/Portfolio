import { exigirAdmin } from '../../utils/auth'
import { lerProjetos } from '../../utils/conteudo'

export default defineEventHandler(async (event) => {
  exigirAdmin(event)
  return lerProjetos()
})
