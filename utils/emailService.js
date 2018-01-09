const nodemailer = require('nodemailer')
const config = require('../config')
const hbs = require('nodemailer-express-handlebars')

const transporter = nodemailer.createTransport(config.mailConf)
const options = {
  from: config.mailConf.from,
}
transporter.use('compile', hbs({ viewPath: 'templates', extName: '.hbs' }))

module.exports = function sendEmail(mailOptions, emailContext) {
  const newOptions = Object.assign(options, mailOptions)
  newOptions.context = emailContext
  transporter.sendMail(newOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log(`Email sent: ${info.response}`)
    }
  })
}
