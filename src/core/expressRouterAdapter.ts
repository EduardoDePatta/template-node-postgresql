import { Request, Response, NextFunction } from 'express'
import { IDatabase } from 'pg-promise'
import { Service } from './Service'
import { HTTP } from '#/helpers'

export type CommitType = 'MANUAL' | 'TRANSACTION' | 'TASK'

export const expressRouterAdapterFactory = (
  serviceFactory: () => Service<any, any>,
  db: IDatabase<any>,
  commitType: CommitType = 'MANUAL'
) => {
  return async (req: HTTP.Req, res: Response, next: NextFunction) => {
    try {
      const service = serviceFactory()
      let result: HTTP.Res<any>

      switch (commitType) {
        case 'TRANSACTION': {
          result = await db.tx(async (t) => {
            return await service.exec(req, res)
          })
          break
        }
        case 'TASK': {
          result = await db.task(async (t) => {
            return await service.exec(req, res)
          })
          break
        }
        default: {
          result = await service.exec(req, res)
        }
      }

      res.status(result.status).json({
        message: result.message,
        data: result.data
      })
    } catch (error) {
      next(error)
    }
  }
}
