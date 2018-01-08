const { wrap: async } = require('co')
const mongoose = require('mongoose')
const Request = mongoose.model('Request')
/* GET users listing. */

exports.createOne = async(function* createOne(req, res, next) {
  try {
    const request = new Request(req.body)
    const newRequest = yield request.save()
    res.json(newRequest)
  } catch (error) {
    next(error)
  }
})
