var referApply = (function () {

  var _validator = null
  function init() {
    $('#refreshCaptchaId').bind('click', function () {
      $('#refreshCaptchaId').prev().attr('src', '/group-buying/captcha/generate?'+Date.now())
    })

    $('.referToFriendBtn').bind('click', function () {
      $("#friendEmail").val('')
      $("#yourEmail").val(window.okchem_user_email)
      $("#yourEmail").attr("readonly",true)
      $("#codeShown").val('')
      $(".hidden-group-buying-id").val($(this).attr('data-group-code'))
      $('#referModal').modal('show')
      _validator.resetForm()
      $('.refresh-friend-btn').prev().attr('src', '/group-buying/captcha/generate' + '?' + Math.random())
    })
    var errorClass = 'form-group--invalid'
    $("#referForm").submit(function (e) {
      e.preventDefault()
    })

    _validator = $('#referForm').validate({
      errorClass: errorClass,
      highlight: function (element) {
        $(element).parent().addClass("has-error")
      },
      unhighlight: function (element) {
        $(element).parent().removeClass("has-error")
      },

      // Rules for form validation
      rules: {
        friendEmail: {
          required: true,
          email: true,
          maxlength: 50,

        }, yourEmail: {
          required: true,
          maxlength: 50,

        }, code: {
          required: true,
          maxlength: 4,

        },
      },
      messages: {
        friendEmail: {
          required: window.okchemI18_emailRequired,
          email: window.okchemI18_emailValid,
        }, yourEmail: {
          required: window.okchemI18_emailRequired,
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
          url: 'refer',
          type: 'POST',
          data: JSON.stringify($(form).serializeFormJSON()),
          success: function () {
            $('#referModal').modal('hide')
            window.okchem.showInfo(window.OKCHEM_REFER_SUCCESS)

          },
          error: function (response) {
            $('#refreshCaptchaId').prev().attr('src', '/group-buying/captcha/generate?'+Date.now())
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
  referApply.init()
})
