import { db } from '../../../connectionConfig'
import { PgTesteRepository } from '../../../Database/repositories/teste'
import { TesteService } from '../services'

export const makeTesteService = () => {
  const testeRepository = new PgTesteRepository(db)
  return new TesteService(testeRepository)
}
