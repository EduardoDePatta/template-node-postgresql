import dotenv from 'dotenv'
dotenv.config()

export default {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  DB_HOST: process.env.DB_HOST || '',
  DB_USER: process.env.DB_USER || '',
  DB_DATABASE: process.env.DB_DATABASE || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_PORT: Number(process.env.DB_PORT ?? 28000),
  PORT: Number(process.env.PORT ?? 5000),
  APP_SECRET: process.env.APP_SECRET || '',
  PUBLIC_KEY: process.env.PUBLIC_KEY || ''
}
