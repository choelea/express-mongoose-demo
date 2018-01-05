const express = require('express')

module.exports = function initHbs(app) {
  // serve static files
  app.use('/live-market/css/style.default.css', express.static('build/css/style.default.css'))
  app.use('/live-market/css/bootstrap.min.css', express.static('build/css/bootstrap.min.css'))

  app.use('/live-market/img', express.static('public/img', { maxAge: 3600000 }))
  app.use('/live-market/img', express.static('public/img/iq', { maxAge: 3600000 }))
  app.use('/live-market/css', express.static('public/css'))
  app.use('/live-market/js', express.static('public/js'))
  app.use('/live-market/js', express.static('public/client'))
  app.use('/live-market/js', express.static('public/client/admin'))
}
