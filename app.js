const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const favicon = require('serve-favicon')
const flash = require('connect-flash')
const config = require('./config')
const i18next = require('./middlewares/i18next')
require('./models') // Bootstrap models, must be required before routers
const route = require('./route')
const logger = require('./logger')
const accessLogger = require('./middlewares/accessLogger')

// mongoose starting, autoIndex is something tricky, pls try to learn more from below link.
// https://stackoverflow.com/questions/14342708/mongoose-indexing-in-production-code
function connect() {
  logger.info('Trying to connect mongodb ...')
  mongoose.Promise = global.Promise
  mongoose.connect(config.mongodbUrl, { useMongoClient: true, config: { autoIndex: true } })
  return mongoose.connection
}
connect()
  .on('error', logger.error)
  .on('disconnected', connect)

// starting express
const app = express()

// load favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
require('./middlewares/static')(app)
app.use(i18next)
require('./middlewares/hbs')(app)
app.use(flash())
require('./middlewares/express-session')(app) // session, passport

app.use(accessLogger)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/live-market', route)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  err.code = '404'
  err.message = 'Request resource doesn\'t exist'
  next(err)
})

/**
 * error-handling functions MUST have four arguments, otherwise it won't work.
 */
app.use((err, req, res, next) => {
  if (err) { logger.error(err) }
  res.status(err.status || 500)
  res.json({ code: err.code || 500, message: err.message })
})


module.exports = app
