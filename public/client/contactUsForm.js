var contactUsForm = (function () {

  var _validator = null
  function init() {
    $('#contactRefreshCaptchaId').bind('click', function () {
      $('#contactRefreshCaptchaId').prev().attr('src', '/live-market/captcha/generate' + '?' + Math.random())
    })

    $('.contactUsBtn').bind('click', function () {
      $("#yourEmail2").val(window.okchem_user_email)
      $("#yourEmail2").attr("readonly",true)
      $("#yourQuestion").val('')
      $("#codeShown2").val('')

     $("#gbid").val($(this).attr('data-group-code'))

      $('#contactModal').modal('show')
      _validator.resetForm()
      $('#contactRefreshCaptchaId').prev().attr('src', '/live-market/captcha/generate' + '?' + Math.random())
    })
    var errorClass = 'form-group--invalid'
    $("#contactForm").submit(function (e) {
      e.preventDefault()
    })

    _validator = $('#contactForm').validate({
      errorClass: errorClass,
      highlight: function (element) {
        $(element).parent().addClass("has-error")
      },
      unhighlight: function (element) {
        $(element).parent().removeClass("has-error")
      },

      // Rules for form validation
      rules: {
        yourEmail: {
          required: true,
          email: true,
          maxlength: 50,

        }, yourQuestion: {
          required: true,
          maxlength: 1000,

        }, code: {
          required: true,
          maxlength: 4,

        },
      },
      messages: {
        yourEmail: {
          required: window.okchemI18_emailRequired,
          email: window.okchemI18_emailValid,
        }, yourQuestion: {
          required: window.okchemI18_yourQuestionRequired,
          email: window.okchemI18_emailValid,

        },
        code: {
          required: window.okchemI18_codeRequired,
        },
      },

      submitHandler: function (form) {
        $.ajax({
          headers: {
            "Content-Type": "application/json",
          },
          url: 'contactUs',
          type: 'POST',
          data: JSON.stringify($(form).serializeFormJSON()),
          success: function () {
            $('#contactModal').modal('hide')
            window.okchem.showInfo(window.OKCHEM_CONTACT_SUCCESS)

          },
          error: function (response) {
            $('#contactRefreshCaptchaId').prev().attr('src', '/live-market/captcha/generate' + '?' + Math.random())
            window.okchem.showError(response.responseJSON.errorMsg)

          },
        })

      },
    })
  }
  return {
    init: init,
  }

})()

$(document).ready(function (){
  contactUsForm.init()
})
