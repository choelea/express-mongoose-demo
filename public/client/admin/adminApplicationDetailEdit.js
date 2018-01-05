
var updateApplicationForm = (function () {

  var assignModal = null
  var $showAssign = null
  var $customerServiceStaff = null
  var $operator = null
  var $itemId = null
  const files = []
  //var showAssignId = null

  function _cache() {
    assignModal = $('#assignModal')
    $showAssign = $('.showAssign')
    $customerServiceStaff = $('#customerServiceStaff')
    $operator = $('#operator')
    $itemId = $('#itemId')
  }
  function init() {

    _cache()
    $showAssign.click(function () {
      const showApplicationId = $(this).val()
      var newArray = window.OKCHEM_APPLICATION_LIST.filter(function (el) {
        return el.id.toString() === showApplicationId

      })
      $customerServiceStaff.val(newArray[0].customerServiceStaff)
      $operator.val(newArray[0].operator)
      $itemId.val(newArray[0].id)
      assignModal.modal('show')
    })
  }

  $('#updateApplicationForm').validate({

    highlight: function(element) {
      $(element).parent().addClass("has-error")
    },
    unhighlight: function(element) {
      $(element).parent().removeClass("has-error")
    },
    submitHandler: function(form) {
      $.ajax({
        headers: {
          "Content-Type":"application/json",
        },
        url: '/admin/application/'+ form.itemId.value +'/application-update',
        type: 'POST',
        data: JSON.stringify($(form).serializeFormJSON()),
        success: function() {
          window.okchem.showInfo("Update Successful")
          setTimeout(function () {
            window.location.href = '/admin/application/'+ form.itemId.value
          },900)


        },
        error: function (response) {
          window.okchem.showError(response.responseJSON.errorMsg)

        },
      })
    },
  })

  // File Upload
  $('#fileupload').fileupload({
    url: '/admin/application/upload',
    dataType: 'json',
    /*add: function (data) {
      data.submit()
      $('#fileupload').fileupload('disable')
    },*/
    done: function (e, data) {

      var fileUrl = data.result.Location
      const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1)
      window.okchem.showInfo("File " + fileName + " Upload Successful")
      //$('#fileupload').fileupload('enable')
      var fileObj = {url:fileUrl,name:fileName}
      files.push(fileObj)
      $('#attachments').val(JSON.stringify(files))
      $('#fileStore').append('<li>'+fileName+'</li>')
    },
    fail: function () {
      alert('An error occured while uploading the file.')
    },
    progressall: function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10)
      $('#progress .progress-bar').css(
        'width',
        progress + '%'
      )
    }}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled')
  return {
    init: init,
  }

})()


$(document).ready(function () {
  /* open assign modal */

  updateApplicationForm.init()
})

