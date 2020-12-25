const config = require('config')
const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const pool = isProduction ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}) : new Pool({
  user: 'your database user name',
  password: config.get('databasePassword'),
  host: 'localhost',
  port: 5432,
  database: 'blissful'
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}