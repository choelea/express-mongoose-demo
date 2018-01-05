var groupon = (function () {
  var init = function () {
    $('[data-toggle="popover"]').popover('show')
  }
  return {
    init: init,
  }
})()

$(document).ready(function() {
  groupon.init()
})
