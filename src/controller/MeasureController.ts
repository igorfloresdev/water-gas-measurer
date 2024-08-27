import { NextFunction, Request, Response } from 'express'
import { MeasureSchema } from '../schema/MeasureSchema'
import { MeasureService } from '../service/MeasureService'

export class MeasureController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { measure_type } = req.body

      const request = req.body
      request.measure_type = measure_type.toUpperCase()

      const data = MeasureSchema.parse(req.body)

      const createdMeasure = await MeasureService.create(data)

      res.status(200).json(createdMeasure)
    } catch (error) {
      next(error)
    }
  }
}
