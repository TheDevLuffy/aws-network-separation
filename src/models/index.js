const Sequelize = require('sequelize')
const { dbSetting } = require('../config')

const db = {}

const sequelize = new Sequelize(
  dbSetting.database,
  dbSetting.username,
  dbSetting.password,
  dbSetting.external
)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Delivery = require('./Delivery')(sequelize, Sequelize)

module.exports = db