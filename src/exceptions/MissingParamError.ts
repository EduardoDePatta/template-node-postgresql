import HttpException from './HttpException'

class MissingParamError extends HttpException {
  constructor (paramName: string) {
    super(400, `Missing parameter: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
export { MissingParamError }
