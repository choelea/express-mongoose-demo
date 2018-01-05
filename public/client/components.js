$(document).ready(function () {
  // Autocomplete
  $("#tags").autocomplete({
    source: window.chembnb.countries,
  })
  // File Upload
  $('#fileupload').fileupload({
    url: '/live-market/components',
    dataType: 'json',
    done: function () {

    },
    progressall: function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10)
      $('#progress .progress-bar').css(
        'width',
        progress + '%'
      )
    }}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled')
})
