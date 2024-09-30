import { Router } from 'express'
import { expressRouterAdapterFactory } from '../../../core/expressRouterAdapter'
import { makeTesteService } from '../factories/makeTesteService'
import { db } from '../../../connectionConfig'

const authRouter = Router()

authRouter.get(
  '/',
  expressRouterAdapterFactory(makeTesteService, db, 'TRANSACTION')
)

export { authRouter }
