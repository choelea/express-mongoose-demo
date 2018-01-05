const { wrap: async } = require('co')
const mongoose = require('mongoose')
const logger = require('../logger')
const { err } = require('../utils')
const only = require('only')

const { assign } = Object
const User = mongoose.model('User')
/* GET users listing. */

exports.createOne = async(function* createOne(req, res, next) {
  try {
    const user = new User(req.body)
    const existUser = yield User.loadByEmail(user.email)
    if (existUser) {
      throw (err(200, 'USER-WITH-EMAIL-EXISTS', 'User with given email already exists'))
    }
    const newUser = yield user.save()
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})
