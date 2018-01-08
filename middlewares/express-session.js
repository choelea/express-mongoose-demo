/**
 * 负责会话的管理，包括passport的认证授权
 */
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)
const config = require('../config')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const LocalStrategy = require('passport-local').Strategy

const local = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  (email, password, done) => {
    const options = {
      criteria: { email },
      select: 'name username email hashed_password salt',
    }
    User.load(options, (err, user) => {
      if (err) return done(err)
      if (!user) {
        return done(null, false, { message: 'Unknown user' })
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' })
      }
      return done(null, user)
    })
  }
)

module.exports = function (app) {
  // serialize session
  passport.serializeUser((user, cb) => cb(null, user.id))
  passport.deserializeUser((id, cb) => User.load({ criteria: { _id: id } }, cb))

  // use these strategies
  passport.use('local', local)

  app.use(session({
    store: new MongoStore({
      url: config.mongodbUrl,
      collection: 'sessions',
    }),
    secret: 'OKCHEM$#@CHEMBNB',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: config.sessionAge },
  }))
  app.use(passport.initialize())
  app.use(passport.session())
}
