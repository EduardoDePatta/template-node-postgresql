import { NextFunction, Request, Response } from 'express'
import HttpException from '../exceptions/HttpException'

export default function errorMiddleware(
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
): void {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  const content = error.content || {}

  response.status(status).send({
    status,
    message,
    content
  })
}
