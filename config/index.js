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
const envConfig = env[process.env.NODE_ENV || 'local']
const config = {
  mongodbUrl: envConfig.mongodbUrl || 'mongodb://localhost/emmab',
  captchaExpireTime: 180000,
  sessionAge: 3600000,
}

module.exports = Object.assign(envConfig, config)
