import { IDatabase, QueryParam } from 'pg-promise'

export class BaseRepository<T> {
  constructor(
    protected readonly db: IDatabase<any>,
    private readonly tableName: string
  ) {}

  public async many(query: QueryParam, params: any[]): Promise<T[]> {
    return this.db.many(query, params)
  }

  public async oneOrNone(query: QueryParam, params: any[]): Promise<T | null> {
    return this.db.oneOrNone(query, params)
  }

  public async manyOrNone(
    query: QueryParam,
    params: any[]
  ): Promise<T[] | null> {
    return this.db.manyOrNone(query, params)
  }

  public async none(query: QueryParam, params: any[]): Promise<null> {
    return this.db.none(query, params)
  }

  public async findById(id: string | number): Promise<T | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`
    return this.db.oneOrNone(query, [id])
  }

  public async findAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`
    return this.db.manyOrNone(query)
  }

  public async create(data: Partial<T>): Promise<T> {
    const columns = Object.keys(data).join(', ')
    const values = Object.values(data)
      .map((_, i) => `$${i + 1}`)
      .join(', ')
    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values}) RETURNING *`
    return this.db.one(query, Object.values(data))
  }

  public async update(id: string | number, data: Partial<T>): Promise<T> {
    const columns = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ')
    const query = `UPDATE ${this.tableName} SET ${columns} WHERE id = $1 RETURNING *`
    return this.db.one(query, [id, ...Object.values(data)])
  }

  public async delete(id: string | number): Promise<null> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1`
    return this.db.none(query, [id])
  }
}
