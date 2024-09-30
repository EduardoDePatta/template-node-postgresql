import winston from 'winston'
import 'winston-daily-rotate-file'

const packageJson = require('./../package.json')

const removeExtraSpaces = winston.format((info) => {
  if (info.message) {
    info.message = info.message.replace(/\s+/g, ' ').trim()
  }
  return info
})

const winstonFormat = winston.format.printf(({ message, label, timestamp }) => {
  return `${timestamp}[${label}]::${message}`
})

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    removeExtraSpaces(),
    winston.format.colorize({
      all: true,
      colors: { info: 'blue' }
    }),
    winston.format.timestamp(),
    winston.format.label({
      label: `template-node-postgresql-v${packageJson.version}`
    }),
    winston.format.splat(),
    winston.format.metadata({
      fillExcept: ['message', 'level', 'timestamp', 'label']
    }),
    winstonFormat
  )
})

const fileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/template-node-postgresql-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '150mb',
  maxFiles: '5d',
  format: winston.format.combine(
    removeExtraSpaces(),
    winston.format.timestamp(),
    winston.format.label({
      label: `template-node-postgresql-v${packageJson.version}`
    }),
    winston.format.splat(),
    winston.format.metadata({
      fillExcept: ['message', 'level', 'timestamp', 'label']
    }),
    winstonFormat
  )
})

const logger = winston.createLogger({
  level: 'info',
  transports: [consoleTransport, fileTransport]
})

export { logger }
