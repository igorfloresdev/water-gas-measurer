import { z } from 'zod'

export const confirmMeasureSchema = z.object({
  measure_uuid: z.string().trim().min(1),
  confirmed_value: z.number().int(),
})
