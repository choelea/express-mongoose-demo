/**
 * To use this express middleware; just import it in you main app js and use it 'use(i18next)' before router.
 */
const i18next = require('i18next')
const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const path = require('path')
const config = require('../config')
/**
 * Add custom language detector.
 */
const subdomain = {
  name: 'subdomain',
  lookup: (req) => {
    let found = void 0
    const firstSub = req.hostname.split('.')[0]
    if (firstSub.length === 2 && config.lngs.indexOf(firstSub) > -1) {
      found = firstSub
    }
    return found
  },
}
const lngDetector = new i18nextMiddleware.LanguageDetector()
lngDetector.addDetector(subdomain)

// For now, just use cookie which comes from the setting of user's browser by default
// const options = {
//   order: ['cookie', 'subdomain', 'header'],
//   lookupCookie: 'i18next',
// }
const options = {
  order: ['cookie'],
}
lngDetector.init(options)


i18next
  .use(Backend)
  .use(lngDetector)
  .init({
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.missing.json'),
    },
    fallbackLng: 'en',
    detection: options,
    whitelist: config.lngs,
    preload: config.lngs,
    saveMissing: true,
  })

module.exports = i18nextMiddleware.handle(i18next)
