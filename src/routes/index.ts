import express, { Application, Request, Response } from 'express'

const routes = (app: Application) => {
  app.route('/').get((req: Request, res: Response) => {
    res.status(200).send('Water and Gás Measurer API Developed By igorfloresdev 🚀')
  })

  app.use(express.json())
}

export default routes
