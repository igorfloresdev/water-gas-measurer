import express, { Application, Request, Response } from 'express'
import { MeasureController } from '../controller/MeasureController'
import errorHandler from '../middleware/errorHandler'

const routes = (app: Application) => {
  app.route('/').get((req: Request, res: Response) => {
    res.status(200).send('Water and Gás Measurer API Developed By igorfloresdev 🚀')
  })

  app.use(express.json({ limit: '100mb' }))

  app.post('/upload', MeasureController.create)
  app.patch('/confirm', MeasureController.update)

  app.use(errorHandler)
}

export default routes
