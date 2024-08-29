import { checkDoubleReport } from '../lib/checkDoubleReport'
import { fileManager } from '../lib/fileManager'
import { generateContext } from '../lib/generateContext'
import { MeasureRepository } from '../repository/MeasureRepository'

export class MeasureService {
  static async create(image: string, customer_code: string, measure_type: 'WATER' | 'GAS', measure_datetime: string) {
    const { file } = await fileManager(image, customer_code)

    const customerMeasures = await MeasureRepository.getAllByCustomerCode(customer_code)

    for (const item of customerMeasures) {
      const isDoubleReport = await checkDoubleReport(
        measure_datetime,
        item.measureDateTime.toString(),
        measure_type,
        item.measureType
      )

      if (isDoubleReport) {
        throw new Error('DOUBLE_REPORT')
      }
    }

    const result = await generateContext(file.mimeType, file.uri, measure_type)

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

  static async update(measureUuid: string, measureType: number) {
    const measureIsConfirmed = await MeasureRepository.getByUuid(measureUuid)

    if (measureIsConfirmed?.hasConfirmed) {
      throw new Error('CONFIRMATION_DUPLICATE')
    }

    const updatedMeasure = await MeasureRepository.update(measureUuid, measureType)
    return updatedMeasure
  }
}
