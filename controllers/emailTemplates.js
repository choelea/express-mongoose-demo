const { wrap: async } = require('co')
const mongoose = require('mongoose')
const EmailTemplate = mongoose.model('EmailTemplate')
/* GET users listing. */

exports.createOne = async(function* createOne(req, res, next) {
  try {
    let template = new EmailTemplate(req.body)
    template = yield template.save()
    res.json(template)
  } catch (error) {
    next(error)
  }
})
