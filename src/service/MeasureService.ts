import { IMeasure } from '../interface/IMeasure'
import { fileManager } from '../lib/fileManager'

export class MeasureService {
  static async create(data: IMeasure) {
    const file = await fileManager(data.image, data.customer_code)
  }
}
