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

  static async getAllByCustomerCode(customerCode: string, measureType?: string) {
    if (measureType === 'ALL') {
      const measures = await prisma.measure.findMany({
        where: {
          customerCode,
        },
      })
      return measures
    }

    const measures = await prisma.measure.findMany({
      where: {
        customerCode,
        measureType,
      },
    })

    return measures
  }

  static async getByUuid(measureUuid: string) {
    const measure = await prisma.measure.findFirst({
      where: { measureUuid },
    })

    return measure
  }

  static async update(measureUuid: string, measureValue: number) {
    const updatedMeasure = await prisma.measure.update({
      data: { measureValue, hasConfirmed: true },
      where: { measureUuid },
    })

    return updatedMeasure
  }
}
