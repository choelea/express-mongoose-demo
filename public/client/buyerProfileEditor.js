var profileForm=(function(){
  function _setCountryCode(value) {
    var $countryCode = $('#buyerCountryCode')
    var code = ''
    window.okchem_buyer_profile_country_value.forEach(function (country) {
      if(country.value === value){
        code = country.code
      }
    })
    $countryCode.val(code)
  }
  var init = function(){
    var errorClass = 'form-group--invalid'
    $("#profile-edit").submit(function(e) {
      e.preventDefault()
    })
    $("#buyerCountry").autocomplete({
      source: window.okchem_buyer_profile_country,
      change: function(event, ui) {
        if(ui.item) _setCountryCode(ui.item.value)
      },
    })

    $('#profile-edit').validate({
      errorClass: errorClass,
      highlight: function(element) {
        $(element).parent().addClass("has-error")
      },
      unhighlight: function(element) {
        $(element).parent().removeClass("has-error")
      },
      // Rules for form validation
      rules: {
        firstName: {
          required: true,
          maxlength: 50,
        },
        lastName: {
          required: true,
          maxlength: 50,
        },
        companyName: {
          required: true,
          maxlength: 255,
        },
        countryValue:{
          required: true,
          validCountry: true,
        },
        telphone:{
          maxlength: 30,
          required:true,
        },
      },
      messages: {
        countryValue:{
          validCountry: window.okchemI18_apply_invalidCountry,
        },
        companyName:{
          maxlength: window.okchemI18_apply_companyLength,
        },
      },

      submitHandler: function() {
        var data = window.okchem.parseForm2Object($("#profile-edit"))
        $.ajax({
          headers: {
            "Content-Type":"application/json",
          },
          url: '/live-market/profile/edit',
          type: 'POST',
          data: JSON.stringify(data),
          success: function(response) {
            if(response.datas.success){
              window.location.href='/live-market/profile'
            }
          },
          error: function (response) {
            window.okchem.showError(response.responseJSON.errorMsg)

          },
        })
      },
    })
  }
  return{
    init:init,
  }
})()

$(document).ready(function() {
  $.validator.addMethod("validCountry", function (value, element) {
    var isValid = false
    window.okchem_buyer_profile_country_value.forEach(function (country) {
      if(country.value === value){
        isValid = true
      }
    })
    return this.optional(element) || isValid
  })
  profileForm.init()
})
