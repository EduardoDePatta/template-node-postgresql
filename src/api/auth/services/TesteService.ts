import { HttpException } from '#/exceptions'
import { HTTP } from '#/helpers'
import { Service } from '../../../core/Service'
import { ITesteRepository } from '../../../Database/repositories/teste/ITesteRepository'
import { Response } from 'express'
export namespace TesteService {
  export interface Body {}
  export interface Query {
    companyCode: string
    fiador?: boolean
  }
}

export class TesteService implements Service<any> {
  constructor(private readonly testeRepository: ITesteRepository) {}

  public async exec(
    _req: HTTP.Req<TesteService.Body, void, TesteService.Query>,
    _res: Response
  ): Promise<HTTP.Res<any>> {
    try {
      const data = await this.testeRepository.getTeste()

      return {
        status: 200,
        message: 'Teste Teste.',
        data
      }
    } catch (error) {
      if (error instanceof HttpException) throw error
      throw new HttpException(400, 'Ocorreu um erro ao executar o Teste.')
    }
  }
}
