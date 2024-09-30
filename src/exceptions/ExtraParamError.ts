import HttpException from './HttpException'

class ExtraParamError extends HttpException {
  constructor (paramName: string) {
    super(400, `Not identified param: ${paramName}`)
    this.name = 'ExtraParamError'
  }
}
export { ExtraParamError }
