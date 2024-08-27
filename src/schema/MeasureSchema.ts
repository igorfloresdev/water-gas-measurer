import { z } from 'zod'
import { base64Schema } from './base64Schema'

export const MeasureSchema = z.object({
  image: base64Schema,
  customer_code: z.string().trim().min(1),
  measure_datetime: z.string().datetime(),
  measure_type: z.enum(['WATER', 'GAS']),
})
