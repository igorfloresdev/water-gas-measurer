import { fileManager } from '../lib/fileManager'
import { generateContext } from '../lib/generateContext'
import { MeasureRepository } from '../repository/MeasureRepository'

export class MeasureService {
  static async create(image: string, customer_code: string, measure_type: 'WATER' | 'GAS', measure_datetime: string) {
    const { file } = await fileManager(image, customer_code)

    const result = await generateContext(file.mimeType, file.uri, measure_type)

    console.log(result)

    const measureData = {
      customer_code,
      measure_datetime,
      measure_type,
      image_url: file.uri,
      measure_value: parseInt(result.value),
    }

    const createdMeasure = await MeasureRepository.create(measureData)

    return createdMeasure
  }
}
