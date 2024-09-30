import { Router } from 'express'
import { authRouter } from './auth/router'

const routerV1 = Router()

routerV1.use('/auth', authRouter)

export { routerV1 }
