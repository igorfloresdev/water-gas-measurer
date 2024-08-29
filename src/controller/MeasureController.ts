import { NextFunction, Request, Response } from 'express'
import { MeasureSchema } from '../schema/MeasureSchema'
import { MeasureService } from '../service/MeasureService'
import { ConfirmMeasureSchema } from '../schema/ConfirmMeasureSchema'

export class MeasureController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { measure_type } = req.body

      const request = req.body
      request.measure_type = measure_type.toUpperCase()

      const data = MeasureSchema.parse(request)

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
      const confirmedMeasure = ConfirmMeasureSchema.parse(req.body)

      await MeasureService.update(confirmedMeasure.measure_uuid, confirmedMeasure.confirmed_value)

      return res.status(200).json({ sucess: true })
    } catch (error) {
      next(error)
    }
  }
}
