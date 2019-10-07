const Sequelize = require('sequelize')
const { dbSetting } = require('../config')

const db = {}

const sequelize = new Sequelize(
  dbSetting.database,
  dbSetting.username,
  dbSetting.password,
  dbSetting
)

db.sequelize = sequelize
db.Sequelize = Sequelize

require('./delivery')(sequelize, Sequelize)

module.exports = db