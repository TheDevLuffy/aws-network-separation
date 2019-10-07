module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Delivery', {
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    orderer: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    menu: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  })
}