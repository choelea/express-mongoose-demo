const Handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')

const loadParthialByPath = (partialsDir) => {
  const filenames = fs.readdirSync(partialsDir)

  filenames.forEach((filename) => {
    const matches = /^([^.]+).hbs$/.exec(filename)
    if (!matches) {
      return
    }
    const name = matches[1]
    const template = fs.readFileSync(`${partialsDir}/${filename}`, 'utf8')
    Handlebars.registerPartial(name, template)
  })
}

const loadPartials = () => {
  const partialsDirList = [
    path.join(__dirname, '../views/layout'),
    path.join(__dirname, '../views/partials'),
    path.join(__dirname, '../views/admin/layout'),
    path.join(__dirname, '../views/admin/partials'),
  ]

  partialsDirList.forEach(partialsDir => loadParthialByPath(partialsDir))
}

module.exports = loadPartials
