const mongoose = require('mongoose')

const Schama = mongoose.Schema

const EmailTemplateSchema = new Schama({
  // client: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  from: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, required: true, trim: true },
  template: { type: String },
})

EmailTemplateSchema.statics = {
  loadByCode: function loadByEmail(code) {
    return this.findOne({ code }).exec()
  },
}

mongoose.model('EmailTemplate', EmailTemplateSchema)
