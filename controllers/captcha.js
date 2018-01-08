const svgCaptcha = require('svg-captcha')
const moment = require('moment')
const config = require('../config/index')


exports.get = function get(req, res) {
  const captcha = svgCaptcha.create({
    ignoreChars: '0o1ilL',
    background: '#C693B1',
  })
  /* eslint-disable no-param-reassign, no-unused-vars */
  req.session.captcha = { text: captcha.text,
                         createTime: moment().toDate().getTime(),
                         expire: config.captchaExpireTime }
  /* eslint-enable no-param-reassign, no-unused-vars */
  res.type('svg')
  res.status(200).send(captcha.data)
}
