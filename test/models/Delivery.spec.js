const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const Delivery = require('../../src/models/Delivery')

describe('Delivery.js', () => {
  const DeliveryModel = Delivery(sequelize, dataTypes)
  const delivery = new DeliveryModel()

  it('테이블의 이름이 Delivery 이다.', () => {
    checkModelName(DeliveryModel)('Delivery')
  })

  context('Delivery 모델이 정상적으로 생성된다.', () => {
    [
      'address',
      'orderer',
      'menu'
    ].forEach(checkPropertyExists(delivery))
  })
})