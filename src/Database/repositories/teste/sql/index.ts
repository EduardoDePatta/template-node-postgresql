import { SqlLoader } from '../../../../helpers'

const getTesteQuery = SqlLoader.getQuery(__dirname, 'getTesteQuery.sql')

export { getTesteQuery }
