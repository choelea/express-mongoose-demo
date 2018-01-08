toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
}

// global helper object
window.okchem = (function () {
  // toastr wrapper
  var okToastr = {
    success: function (message) {
      toastr.success(message)
    },
    error: function (message) {
      toastr.error(message)
    },
  }
  var showInfo = function (message) {
    okToastr.success(message)
  }
  var showError = function (message) {
    okToastr.error(message)
  }
  var convert2Int = function (val) {
    var pattern = /^\d+$/g
    if (pattern.test(val)) {
      return parseInt(val)
    }
    return val
  }
  var _padLeft = function (number, width, padString) {
    var _width = width || 2
    var _padString = padString || '0'
    var _numberStr = number + ''
    return _numberStr.length >= width ? _numberStr : new Array(_width - _numberStr.length + 1).join(_padString) + _numberStr
  }
  var yearMonthDayHourMinute = function (millis) {
    var datetime = new Date(millis)
    if (datetime) {
      var day = datetime.getDate()
      var month = datetime.getMonth() + 1
      var year = datetime.getFullYear()
      var hours = datetime.getHours()
      var minutes = datetime.getMinutes()
      return year + '-' + month + '-' + day + ' ' + _padLeft(hours) + ':' + _padLeft(minutes)
    } else {
      return 'Invalid Date'
    }
  }
  var yearMonthDayHourMinute2 = function (millis) {
    var datetime = new Date(millis)
    if (datetime) {
      var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec",
      ]
      var day = datetime.getDate()
      var monthIndex = datetime.getMonth()
      var year = datetime.getFullYear()
      var hours = datetime.getHours()
      var minutes = datetime.getMinutes()
      return monthNames[monthIndex] + ' ' + day + ', ' + year + ' ' + _padLeft(hours) + ':' + _padLeft(minutes)
    } else {
      return 'Invalid Date'
    }
  }
  var yearMonthDayHourMinuteSecond = function (millis) {
    var datetime = new Date(millis)
    if (datetime) {
      var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec",
      ]
      var day = datetime.getDate()
      var monthIndex = datetime.getMonth()
      var year = datetime.getFullYear()
      var hours = datetime.getHours()
      var minutes = datetime.getMinutes()
      var seconds = datetime.getSeconds()
      return monthNames[monthIndex] + ' ' + day + ', ' + year + ' ' + _padLeft(hours) + ':' + _padLeft(minutes) + ':' + _padLeft(seconds)
    } else {
      return 'Invalid Date'
    }
  }
  var yearMonthDay = function (millis) {
    var datetime = new Date(millis)
    if (datetime) {
      var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec",
      ]
      var day = datetime.getDate()
      var monthIndex = datetime.getMonth()
      var year = datetime.getFullYear()
      return monthNames[monthIndex] + ' ' + day + ', ' + year
    } else {
      return 'Invalid Date'
    }
  }
  var events = {
    events: {},
    on: function (eventName, fn) {
      this.events[eventName] = this.events[eventName] || []
      this.events[eventName].push(fn)
    },
    off: function (eventName, fn) {
      if (this.events[eventName]) {
        for (var i = 0; i < this.events[eventName].length; i++) {
          if (this.events[eventName][i] === fn) {
            this.events[eventName].splice(i, 1)
            break
          }
        }
      }
    },
    emit: function (eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function (fn) {
          fn(data)
        })
      }
    },
    clear: function () {
      this.events = {}
    },
    deleteByName: function(eventName){
      if (this.events[eventName]) {
        delete events[eventName]
      }
    },
  }
  var _serialize2ObjectWithIntConversion = function(form) {
    var o = {}
    var a = $(form).serializeArray()
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]]
        }
        o[this.name].push(window.okchem.convert2Int(this.value) || '')
      } else {
        o[this.name] = window.okchem.convert2Int(this.value) || ''
      }
    })
    return o
  }
  var _serialize2Object = function(form) {
    var o = {}
    var a = $(form).serializeArray()
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]]
        }
        o[this.name].push(this.value || '')
      } else {
        o[this.name] = this.value || ''
      }
    })
    return o
  }
  var parseFrom2Object = function (form, options) {
    if(options && options.isIntConverted === true){
      return _serialize2ObjectWithIntConversion(form)
    } else {
      return _serialize2Object(form)
    }
  }
  var dateEarlierOrEqualThan = function (date1, date2) {
    if (date1 instanceof Date && date2 instanceof Date) {
      return date1.getFullYear() !== date2.getFullYear() ?
        date1.getFullYear() < date2.getFullYear() :
        (
          date1.getMonth() !== date2.getMonth() ? date1.getMonth() < date2.getMonth() :
            date1.getDate() <= date2.getDate()
        )
    } else {
      throw new Error('date comparison failed, please ensure both parameters are date object')
    }
  }
  var dateEarlierThan = function (date1, date2) {
    if (date1 instanceof Date && date2 instanceof Date) {
      return date1.getFullYear() !== date2.getFullYear() ?
        date1.getFullYear() < date2.getFullYear() :
        (
          date1.getMonth() !== date2.getMonth() ? date1.getMonth() < date2.getMonth() :
            date1.getDate() < date2.getDate()
        )
    } else {
      throw new Error('date comparison failed, please ensure both parameters are date object')
    }
  }
  return {
    events: events,
    showInfo: showInfo,
    showError: showError,
    convert2Int: convert2Int,
    yearMonthDay: yearMonthDay,
    yearMonthDayHourMinuteSecond: yearMonthDayHourMinuteSecond,
    yearMonthDayHourMinute: yearMonthDayHourMinute,
    yearMonthDayHourMinute2: yearMonthDayHourMinute2,
    parseForm2Object: parseFrom2Object,
    dateEarlierOrEqualThan: dateEarlierOrEqualThan,
    dateEarlierThan: dateEarlierThan,
  }
})()

// main document ready function
// pls put global setting here inside
// 1. scroll up
// 2. string.format
$(function () {
  $.ajaxSetup({
    error: function (jqXHR) {
      if (jqXHR.status == 404) {
        // Do nothing, this should not happens
      } else {
        console.log(jqXHR.responseJSON.code)
        okchem.showError($.i18nMs[jqXHR.responseJSON.code])
      }
    },
    statusCode: {
      401: function () {
        if (location.pathname.startsWith('/instant-quote/supplier')) {
          location.href = location.href // Reload the page for supplier
        } else {
          location.href = '/instant-quote/login?redirectTo=' + location.href
        }
      },
    },
  })
  // table responsive
  $.fn.serializeFormJSON = function () {
    var o = {}
    var a = this.serializeArray()
    $.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]]
        }
        o[this.name].push(this.value || '')
      } else {
        o[this.name] = this.value || ''
      }
    })
    return o
  }

  if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments
      return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match

      })
    }
  }
})
