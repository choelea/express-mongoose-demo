const Handlebars = require('handlebars')
const moment = require('moment')

class handlebarsHelper {
  static init() {
    Handlebars.registerHelper('json', context => JSON.stringify(context))
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
      return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
    })
    Handlebars.registerHelper('ifNotEquals', function (arg1, arg2, options) {
      return (arg1 !== arg2) ? options.fn(this) : options.inverse(this)
    })
    Handlebars.registerHelper('isFirstElementOfArray', function (currentIndex, options) {
      return (currentIndex === 0) ? options.fn(this) : options.inverse(this)
    })
    Handlebars.registerHelper('isLastElementOfArray', function (currentIndex, arr, options) {
      return (currentIndex === arr.length - 1) ? options.fn(this) : options.inverse(this)
    })
    Handlebars.registerHelper('isNotLastTwoElementOfArray', function (currentIndex, arr, options) {
      return (currentIndex <= arr.length - 2) ? options.fn(this) : options.inverse(this)
    })
    Handlebars.registerHelper('isLastSecondElementOfArray', function (currentIndex, arr, options) {
      return (currentIndex === arr.length - 2) ? options.fn(this) : options.inverse(this)
    })
    Handlebars.registerHelper('yearMonthDay',
        datetime => moment(datetime).format('MMM DD, YYYY'))
    // progress bar helper begins
    Handlebars.registerHelper('stageColStyle', stageCount => {
      // stageCount must be even number
      const size = 12 / stageCount
      return `col-xs-${size} col-sm-${size}`
    })
    Handlebars.registerHelper(
      'currentStagePopoverAttr',
      (currentIndex, currentStage, currentText, show) => {
        // currentIndex start from 0
        // currentStage start from 1
        if (show && currentIndex === currentStage - 1) {
          return `data-toggle="popover" data-trigger="manual" 
          data-placement="bottom" data-content="${currentText}"`
        }
        return ''
      }
    )
    Handlebars.registerHelper(
      'stagePercentageColStyle',
      (currentIndex, currentStage, stageCount, percentage) => {
        // currentIndex start from 0
        // currentStage start from 1
        if (currentIndex < currentStage - 1) {
          return 'width: 100%'
        } else if (currentIndex === currentStage - 1) {
          return `width: ${percentage}`
        }
        return 'width: 0%'
      }
    )
  }
}

module.exports = handlebarsHelper
