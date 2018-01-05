var buyerChangePwdForm = (function () {
  function init() {
    $('#buyerChangePwdForm').submit(function (e) { e.preventDefault() })

    $('#buyerChangePwdForm').validate({
      rules: {
        newpwdConfirm: {
          equalTo: "#newpwd",
        },
      },
      submitHandler: function (form) {
        $.ajax({
          url: '/group-buying/change-password',
          type: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify($(form).serializeFormJSON()),
          success: function (json) {
            if (json.success) {
              window.okchem.showInfo($.i18nMs.changePwd.success)
            } else {
              window.okchem.showError($.i18nMs.changePwd[json.msgCode] || $.i18nMs.changePwd.defaultErr)
            }
          },
          error: function () {
            window.okchem.showError($.i18nMs.changePwd.defaultErr)
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
  buyerChangePwdForm.init()
})
