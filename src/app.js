const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const { sequelize } = require('./models')

const app = express()
const router = express.Router()

// sequelize.sync()

app.use(bodyParser.json())
app.use(cors())
app.use(router)

router.get('/', (req, res) => {
  res.send({
    message: 'test router'
  })
})

app.listen(process.env.PORT || 8081)