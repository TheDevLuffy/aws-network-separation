const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize } = require('./models')

const app = express()
const router = express.Router()
const deliveryMapping = require('./requestmapping/DeliveryMapping')

sequelize.sync()

app.use(bodyParser.json())
app.use(cors())
app.use(router)

router.get('/', (req, res) => {
  res.send({
    message: 'test router'
  })
})

app.use('/delivery', deliveryMapping)

app.listen(process.env.PORT || 8081, () => {
  console.log(`App Started on Port ${process.env.PORT || 8081}`)
})