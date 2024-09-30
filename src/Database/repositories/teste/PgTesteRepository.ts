import { BaseRepository } from '../../BaseRepository'
import { ITesteRepository } from './ITesteRepository'
import { getTesteQuery } from './sql'

export class PgTesteRepository
  extends BaseRepository<any>
  implements ITesteRepository
{
  constructor(db: any) {
    super(db, 'teste')
  }

  public async getTeste(): Promise<any> {
    return this.db.many(getTesteQuery)
  }
}
