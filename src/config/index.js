require('dotenv').config()

module.exports = {
  port: process.env.PORT || 8081,
  dbSetting: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    external: {
      port: process.env.REMOTE_PORT,
      host: process.env.REMOTE_HOST,
      dialect: process.env.DB_DIAL
    }
  }
}