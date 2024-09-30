import environments from './environments'
import pgPromise from 'pg-promise'
import bluebird from 'bluebird'

const pgp = pgPromise({
  promiseLib: bluebird
})

const config = {
  user: environments.DB_USER,
  host: environments.DB_HOST,
  database: environments.DB_DATABASE,
  password: environments.DB_PASSWORD,
  port: environments.DB_PORT
}

const db = pgp(config)

export { db }
