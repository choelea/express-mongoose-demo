const local = require('./deployment/local')
const dev = require('./deployment/dev')
const int = require('./deployment/int')
const pre = require('./deployment/pre')
const prd = require('./deployment/prd')
const env = {
  local,
  dev,
  int,
  pre,
  prd,
}

// TODO: ensure the NODE_ENV must equal to short name defined above
const activeEnv = env[process.env.NODE_ENV || 'local']
const config = {
  mongodbUrl:activeEnv.mongodbUrl || "mongodb://localhost/emmab",
  captchaExpireTime: 180000,
  admindomain: '/admin',
  sessionAge: 3600000,
}

module.exports = config
