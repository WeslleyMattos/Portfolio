import { exigirAdmin } from '../../utils/auth'
import { lerMetricas, serieRecente } from '../../utils/metricas'

export default defineEventHandler(async (event) => {
  exigirAdmin(event)

  const [totais, serie] = await Promise.all([lerMetricas(), serieRecente(30)])
  return { totais, serie }
})
