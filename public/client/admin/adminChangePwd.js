var buyerChangePwdForm = (function () {
  function init() {
    $('#adminChangePwdForm').submit(function (e) { e.preventDefault() })

    $('#adminChangePwdForm').validate({
      rules: {
        newpwdConfirm: {
          equalTo: "#newpwd",
        },
      },
      submitHandler: function (form) {
        $.ajax({
          url: '/admin/change-password',
          type: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify($(form).serializeFormJSON()),
          success: function (json) {
            if (json.success) {
              window.okchem.showInfo('Your password is changed successfully!')
            } else {
              if(json.msgCode === '0330520008') {
                window.okchem.showError('The old password is not correct')
              } else {
                window.okchem.showError('Failed to change password')
              }
            }
          },
          error: function () {
            window.okchem.showError('Failed to change password')
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
