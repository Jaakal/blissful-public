const config = require('config')
const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const pool = isProduction ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}) : new Pool({
  user: config.get('databaseUser'),
  password: config.get('databasePassword'),
  host: config.get('databaseHost'),
  port: config.get('databasePort'),
  database: config.get('databaseName')
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}