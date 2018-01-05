const express = require('express')

module.exports = function initHbs(app) {
  // serve static files
  app.use('/css/style.default.css', express.static('build/css/style.default.css'))
  app.use('/css/bootstrap.min.css', express.static('build/css/bootstrap.min.css'))

  app.use('/img', express.static('public/img', { maxAge: 3600000 }))
  app.use('/img', express.static('public/img/iq', { maxAge: 3600000 }))
  app.use('/css', express.static('public/css'))
  app.use('/js', express.static('public/js'))
  app.use('/js', express.static('public/client'))
  app.use('/js', express.static('public/client/admin'))
}
