import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

// eslint-disable-next-line
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err)

  if (err instanceof ZodError) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: `${err.issues[0].path}: ${err.issues[0].message}`,
    })
    return
  }

  if (err.message === 'DOUBLE_REPORT') {
    res.status(409).json({
      error_code: 'DOUBLE_REPORT',
      error_description: 'Leitura do mês já realizada',
    })
    return
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2025')
      res.status(404).json({
        error_code: 'MEASURE_NOT_FOUND',
        error_description: 'Leitura não encontrada',
      })

    return
  }

  if (err.message === 'CONFIRMATION_DUPLICATE') {
    res.status(409).json({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura já confirmada',
    })

    return
  }

  if (err.message === 'INVALID_TYPE') {
    res.status(400).json({
      error_code: 'INVALID_TYPE',
      error_description: 'Tipo de medição não permitida',
    })
    return
  }

  if (err.message === 'MEASURES_NOT_FOUND') {
    res.status(404).json({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: 'Nenhuma leitura encontrada',
    })
    return
  }

  res.status(500).send('Internal Server Error')
}

export default errorHandler
