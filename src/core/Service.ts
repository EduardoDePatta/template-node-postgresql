import { HTTP } from '../helpers'
import { Response } from 'express'

export abstract class Service<ReqBody = any, ResBody = any> {
  abstract exec(
    req: HTTP.Req<ReqBody, void, any>,
    res: Response
  ): Promise<HTTP.Res<ResBody>>
}
