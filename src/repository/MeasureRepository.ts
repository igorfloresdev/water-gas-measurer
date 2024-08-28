import { IMeasure } from '../interface/IMeasure'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class MeasureRepository {
  static async create(data: IMeasure) {
    const createdMeasure = await prisma.measure.create({
      data: {
        customerCode: data.customer_code,
        measureDateTime: data.measure_datetime,
        measureType: data.measure_type,
        measureValue: data.measure_value,
        imageUrl: data.image_url,
      },
    })

    return createdMeasure
  }
}
