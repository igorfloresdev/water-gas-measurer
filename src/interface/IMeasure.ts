export interface IMeasure {
  measure_uuid?: string
  customer_code: string
  measure_datetime: string
  measure_type: 'WATER' | 'GAS'
  measure_value: number
  image_url: string
}
