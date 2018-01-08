var signupForm = (function () {
  function init() {
    // $('#refreshCaptchaId').bind('click',function () {
    //   $('#refreshCaptchaId').prev().attr('src','/live-market/captcha/generate?'+Date.now())
    // })
    $('#signupForm').submit(function (e) {
      e.preventDefault()
    })
    $('#signupForm').validate({
      errorClass: 'form-group--invalid',
      submitHandler: function (form) {
        $.ajax({
          url: '/live-market/auth/signup',
          type: 'POST',
          data: $(form).serialize(),
          success: function () {
            location.href='/live-market/auth/signup/success?email='+$('#username').val()
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
