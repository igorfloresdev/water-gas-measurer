import { NextFunction, Request, Response } from 'express'
import { measureSchema } from '../schema/measureSchema'
import { MeasureService } from '../service/MeasureService'
import { confirmMeasureSchema } from '../schema/confirmMeasureSchema'

export class MeasureController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { measure_type } = req.body

      const request = req.body
      request.measure_type = measure_type.toUpperCase()

      const data = measureSchema.parse(request)

      const createdMeasure = await MeasureService.create(
        data.image,
        data.customer_code,
        data.measure_type,
        data.measure_datetime
      )

      res.status(200).json({
        image_url: createdMeasure.imageUrl,
        measure_value: createdMeasure.measureValue,
        measure_uuid: createdMeasure.measureUuid,
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const confirmedMeasure = confirmMeasureSchema.parse(req.body)

      await MeasureService.update(confirmedMeasure.measure_uuid, confirmedMeasure.confirmed_value)

      return res.status(200).json({ sucess: true })
    } catch (error) {
      next(error)
    }
  }

  static async getAllByCustomerCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { customer_code } = req.params
      let { measure_type } = req.query
      measure_type = measure_type as string

      if (!measure_type) {
        measure_type = 'ALL'
      } else if (
        measure_type.toUpperCase() !== 'WATER' &&
        measure_type.toUpperCase() !== 'GAS' &&
        measure_type.toUpperCase() !== 'ALL'
      ) {
        throw new Error('INVALID_TYPE')
      }

      const measures = await MeasureService.getAllByCustomerCode(customer_code, measure_type.toUpperCase())

      if (measures.length === 0) {
        throw new Error('MEASURES_NOT_FOUND')
      }

      const measuresData = {
        customer_code: measures[0].customerCode,
        measures: measures.map((measure: any) => ({
          measure_uuid: measure.measureUuid,
          measure_datetime: measure.measureDateTime,
          measure_type: measure.measureType,
          has_confirmed: measure.hasConfirmed,
          image_url: measure.imageUrl,
        })),
      }

      res.status(200).json(measuresData)
    } catch (error) {
      next(error)
    }
  }
}
