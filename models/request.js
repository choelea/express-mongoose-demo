const mongoose = require('mongoose')

const Schama = mongoose.Schema

const minlength = [3, 'The value of `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).']

const RequestSchema = new Schama({
  email: { type: String, required: true, minlength, index: true, trim: true, lowercase: true },
  name: { type: String, required: true, trim: true },
  mobile: { type: String },
  country: { type: String },
  companyName: { type: String },
  booth: { type: String },
  request: { type: String },
})

RequestSchema.statics = {
  loadByEmail: function loadByEmail(code) {
    return this.findOne({ code }).exec()
  },
  pageList: function pageList(conditions, index, size) {
    const criteria = conditions || {}
    const page = index || 0
    const limit = size || 30
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec()
  },
}

mongoose.model('Request', RequestSchema)
