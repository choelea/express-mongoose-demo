const engines = require('consolidate')
const handlebarHelper = require('./handlebarsHelper')
const loadPartials = require('./partialsLoader')

module.exports = function initHbs(app) {
  // view engine setup
  app.engine('hbs', engines.handlebars)
  app.set('views', ['./views', './views/admin'])
  app.set('view engine', 'hbs')

  // register handlebars helper

  handlebarHelper.init()

  // loading partials

  loadPartials()
}
