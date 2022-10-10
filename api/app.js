'use strict'

const express = require('express')
const app = express()
const cors = require('cors')

const middleware = express.Router()
require('./helper/index')

app.use(cors())
app.use(express.json())
app.use('/api', middleware)

const { executeQuery } = require('./routes/index')

middleware.post('/execute', executeQuery)

app.listen(3000)