const { wrap: async } = require('co')
const mongoose = require('mongoose')
const { err } = require('../utils')
const User = mongoose.model('User')
const sendEmail = require('../utils/emailService')
/* eslint-disable no-param-reassign */
exports.loginPage = function loginPage(req, res) {
  req.session.redirectTo = req.query.redirectTo
  // console.log(req.flash('error'))
  res.render('auth/login')
}
exports.signupSuccess = function signupSuccess(req, res) {
  res.render('auth/signup-success', { email: req.query.email })
}
exports.createOne = async(function* createOne(req, res, next) {
  try {
    const user = new User(req.body)
    const existUser = yield User.loadByEmail(user.email)
    if (existUser) {
      throw (err(400, 'USER-WITH-EMAIL-EXISTS', 'User with given email already exists'))
    } else {
      const newUser = yield user.save()
      res.json(newUser)
    }
  } catch (error) {
    next(error)
  }
})

// TODO if there is no redirectTo in session, redirect to the configured url
exports.postSignin = function postSignin(req, res) {
  const redirectTo = req.session.redirectTo ? req.session.redirectTo : '/live-market'
  delete req.session.redirectTo
  res.redirect(redirectTo)
}


exports.sendPwdResetEmail = function sendPwdResetEmail(req, res) {
  sendEmail({ to: req.body.userEmail, subject: 'Forgot password', text: 'test.......' })
  res.json({ success: true })
}
