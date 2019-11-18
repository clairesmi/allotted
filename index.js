const express = require('express')
const app = express()
const mongoose = require('mongoose') //ORM for mongodb
const bodyParser = require('body-parser')
const router = require('./config/router')// ge router module
const logger = require('./lib/logger')
const errorHandler = require('./lib/errorHandler')
const { dbURI } = require('./config/environment')

require('dotenv').config()

app.use(express.static(`${__dirname}/dist`))

mongoose.connect(
  dbURI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('mongo is connected. ')  
) // connect our db first

app.use(bodyParser.json()) //bp middleware

app.use(logger)// registering custom logger

app.use('/api', router) // all middleware is now in the router it always has to be bellow body parser // Prefix by API

app.use(errorHandler)

app.get('/*', (req, res) => res.status(404).json({ message: 'Not Found checking' })) // catch all

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`))

app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))


module.exports = app
