const express = require('express')
const products = require('./controllers/products')
const users = require('./controllers/users')
const requests = require('./controllers/requests')
const captcha = require('./controllers/captcha')
const passport = require('passport')
/* eslint-disable new-cap */
const router = express.Router()
/* eslint-enable new-cap */
/* GET home page. */
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/auth/signin', users.loginPage)
router.post('/auth/signin', passport.authenticate('local', {
  successRedirect: '/live-market',
  failureRedirect: '/live-market/auth/signin',
  failureFlash: true,
}), users.postSignin)
router.post('/auth/signup', users.createOne)
router.get('/auth/signup/success', users.signupSuccess)
router.get('/auth/captcha', captcha.get)
router.get('/auth/forgotpassword', (req, res) => { res.render('auth/forgotPassword') })
router.post('/auth/forgotpassword', users.sendPwdResetEmail)
// router.get('/live-market/auth/signup/success',)

router.get('/u/me', (req, res) => { res.json(req.user) })
router.get('/u/logout', (req, res) => {
  req.logout()
  res.redirect('/live-market')
})

router.post('/users', users.createOne)
router.post('/requests', requests.createOne)

/* Products Related */
// router.param('productCode', products.loadByCode)
// router.get('/products', products.pageList)
// router.get('/products/:productCode', products.get)
router.post('/products', products.createOne)
// router.put('/products/:productCode', products.update)

module.exports = router
