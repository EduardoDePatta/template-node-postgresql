export default class HttpException extends Error {
  status: number
  message: string
  content: any
  constructor (status: number, message: string, content?: any) {
    super(message)
    this.status = status
    this.message = message
    this.content = content
  }
}

export { HttpException }
