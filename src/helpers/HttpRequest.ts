import { Request } from 'express'

export interface ApiResponse<T> {
  data?: T
  message: string
  status: number
}

export namespace HTTP {
  export interface Req<B = any, P = any, Q = any>
    extends Request<P, any, B, Q> {
    body: B
    params: P
    query: Q
  }

  export interface Res<T = any> {
    data?: T
    message: string
    status: number
  }
}
