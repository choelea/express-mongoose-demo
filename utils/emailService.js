const nodemailer = require('nodemailer')
const config = require('../config')

console.log(config.mailConf)
const transporter = nodemailer.createTransport(config.mailConf)
const options = {
  from: config.mailConf.from,
}
module.exports = function sendEmail(mailOptions) {
  const newOptions = Object.assign(options, mailOptions)
  console.log(newOptions)
  transporter.sendMail(newOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
