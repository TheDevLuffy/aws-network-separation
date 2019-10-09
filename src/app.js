const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(cors())
app.use(router)

router.get('/', (req, res) => {
  res.send({
    message: 'test router'
  })
})

app.listen(process.env.PORT || 8081, () => {
  console.log(`App Started on Port ${process.env.PORT || 8081}`)
})
