import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../exceptions'
import jwt from 'jsonwebtoken'
import environments from '#/environments'
import { User } from '../api/auth/interfaces'

interface JwtPayloadWithUser extends jwt.JwtPayload {
  user: User
}
const verifyToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const secureKey = req.headers['x-public-key']

  if (!authHeader)
    return next(new HttpException(401, 'Authorization header is missing.'))

  const token = authHeader && authHeader.split(' ')[1]

  if (token === null)
    return next(
      new HttpException(401, 'A token is required for authentication.')
    )

  if (secureKey !== environments.PUBLIC_KEY)
    return next(new HttpException(401, 'Secure key is missing.'))

  try {
    const decoded = jwt.verify(
      token,
      environments.APP_SECRET
    ) as JwtPayloadWithUser
    req.user = decoded.user
    req.token = token
  } catch (error) {
    next(new HttpException(403, 'Unauthorized.'))
  }

  next()
}

export { verifyToken }
