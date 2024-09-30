import { User } from './api/auth/interfaces'
import { ApiResponse } from './BaseService/responseFormatter'

declare global {
  namespace Express {
    interface Request {
      token: string
      user: User
    }
  }
}
