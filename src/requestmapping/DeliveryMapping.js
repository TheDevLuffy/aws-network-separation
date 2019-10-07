const express = require('express')
const router = express.Router()

const DeliveryController = require('../controller/DeliveryController')

router.get('/',
  DeliveryController.getDelivery
)

router.post('/',
  DeliveryController.createDelivery
)

router.patch('/',
  DeliveryController.updateDelivery
)

router.delete('/',
  DeliveryController.deleteDelivery
)

module.exports = router
