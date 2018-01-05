var signupForm = (function () {
  function init() {
    $('#refreshCaptchaId').bind('click',function () {
      $('#refreshCaptchaId').prev().attr('src','/live-market/captcha/generate?'+Date.now())
    })
    $('#signupForm').submit(function (e) {
      e.preventDefault()
    })
    $('#signupForm').validate({
      errorClass: 'form-group--invalid',
      submitHandler: function (form) {
        $.ajax({
          url: '/live-market/ajaxsignup',
          type: 'POST',
          data: $(form).serialize(),
          success: function () {
            location.href='/live-market/signup/success?email='+$('#username').val()
          },
          error: function (response) {
            var json = response.responseJSON
            if (json.msgCode==='0330520020') {
              $('#sendVerficationDiv1').show()
              $('#sendVerficationLink1').attr('href','/live-market/send-verify-email?userEmail=' + $('#username').val())
            }else{
              $('#sendVerficationDiv1').hide()
            }

            if (json.msgCode) {
              $('#signupErrorDiv').html($.i18nMs.register[json.msgCode] || $.i18nMs.register.defaultErr)
              $('#signupErrorDiv').show()
            } else {
              $('#refreshCaptchaId').prev().attr('src','/live-market/captcha/generate?'+Date.now())
              window.okchem.showError(response.responseJSON.errorMsg)
            }
          },
        })
      },
    })

  }
  return {
    init: init,
  }

})()

var loginForm = (function () {
  function init() {
    var validator = {
      errorClass: 'form-group--invalid',
    }
    $('#loginForm').validate(validator)
  }
  return {
    init: init,
  }

})()

$(document).ready(function (){
  signupForm.init()
  loginForm.init()
})
