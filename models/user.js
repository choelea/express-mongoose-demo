/**
 * Module dependencies.
 */
const mongoose = require('mongoose')
const crypto = require('crypto')

const { Schema } = mongoose
/**
 * User Schema
 */
const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  hashedPassword: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
})

const validatePresenceOf = value => value && value.length

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function buildPassword(password) {
    this.t_password = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(() => this.t_password)

/**
 * Validations
 */
UserSchema.path('name').validate(name => name.length, 'Name cannot be blank')

UserSchema.path('email').validate(function checkEmail(email, fn) {
  const User = mongoose.model('User')
  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email }).exec((err, users) => {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, 'Email already exists')

UserSchema.path('hashedPassword').validate(val => val.length, 'Password cannot be blank')


/**
 * Pre-save hook
 */
UserSchema.pre('save', (next) => {
  if (this.isNew && !validatePresenceOf(this.password)) {
    next(new Error('Invalid password'))
  } else {
    next()
  }
})

/**
 * Methods
 */
UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: plainText => this.encryptPassword(plainText) === this.hashedPassword,

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: () => Math.round((new Date().valueOf() * Math.random())),

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function encryptPassword(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      console.log(err)
      return ''
    }
  },
}

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: (options, cb) => this.findOne(options.criteria)
    .select(options.select || 'name username')
    .exec(cb),
  loadByEmail: function loadByEmail(email) {
    return this.findOne({ email }).exec()
  },
}

mongoose.model('User', UserSchema)
