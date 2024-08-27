import { IMeasure } from '../interface/IMeasure'
import { GoogleAIFileManager } from '@google/generative-ai/server'

const fileManager = new GoogleAIFileManager(process.env.API_KEY as string)

export class MeasureService {
  static async create(data: IMeasure) {
    const metadata = {
      mimeType: 'image/jpeg',
      displayName: `measure_${data.customer_code}_${Date()}`,
    }

    const file = await fileManager.uploadFile(data.image, metadata)
    console.log(file)
  }
}
