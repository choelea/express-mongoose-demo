$(document).ready(function() {
  $.validator.addMethod("validDecimal", function (value, element) {
    return this.optional(element) || /^\d{1,9}(\.\d{1,2})?$/.test(value)
  })
  $.validator.addMethod("validCountry", function (value, element) {
    var isValid = false
    window.okchem_countries_data.forEach(function (country) {
      if(country.value === value){
        isValid = true
      }
    })
    return this.optional(element) || isValid
  })
  $("#quantityNum").on("change",function(){
      $(".quantity-error").remove()
  })
  var code = window.okchem_apply_product_code
  appDetail.init(window.okchem_apply_products)
  appDetail.selectedProduct(code)
  appForm.init()
})

var appDetail =(function(){
  var $firstName=null
  var $lastName=null
  var $companyName=null
  var $telephone=null
  var $country=null
  var $countryCode=null

  var _message={}
  var _selectedProduct=null
  var selectedProduct = function(code){
    $("#applyProduct option[value="+code+"]").attr("selected",true)
    var product=_message[code]
    $("#applyPrice").html(product.currency+" "+product.price+"/"+product.unit)
    $("#quantityUnit").html(product.quantityUnit)
  }
  var _cacheDOM=(function(){
    _selectedProduct   = $("#applyProduct")
    $firstName=$("#buyerFirstName")
    $lastName=$("#buyerLastName")
    $companyName=$("#buyerCompanyName")
    $telephone=$("#userTelphone")
    $country=$("#buyerCountry")
    $countryCode=$("#buyerCountryCode")
  })
  var init =function(list){
    _cacheDOM()
    var source=window.okchem_apply_product_source
    if(source==="2"){
     // $("#applyPaymentTerm option[index='1']").remove()
     // $("#applyPaymentTerm").find("option").remove()
      $("#applyPaymentTerm option:first").remove()
    }

    if(list){
      list.forEach(function (item) {
        _message[item.productCode] = item
      })
    }
    _selectedProduct.bind('change',function () {
      var code=$(this).val()
      var product=_message[code]
      $("#applyPrice").html(product.currency+" "+product.price+"/"+product.unit)
    })

    $.ajax({
      headers: {
        "Content-Type":"application/json",
      },
      url: '/live-market/apply-form/email',
      type: 'GET',
      success: function(response) {
        var userInfo=response.datas.data
        if(userInfo){
          if(userInfo.firstName){
            $firstName.val(userInfo.firstName)
            $firstName.attr("readonly",true)
          }
          if(userInfo.lastName){
            $lastName.val(userInfo.lastName)
            $lastName.attr("readonly",true)
          }
          if(userInfo.companyName){
            $companyName.val(userInfo.companyName)
            $companyName.attr("readonly",true)
          }
          if(userInfo.telphone){
            $telephone.val(userInfo.telphone)
            $telephone.attr("readonly",true)
          }
          if(userInfo.country){
            $country.val(userInfo.country)
            $countryCode.val(userInfo.countryCode)
            $country.attr("readonly",true)
          }

        }
      },
      error: function (response) {
        window.okchem.showError(response.responseJSON.errorMsg)
      },
    })

  }
  return{
    init: init,
    selectedProduct:selectedProduct,
    messageDate:_message,
  }

})()

var appForm =(function(){
  var dateErrorMsgTemplate = '<span class="form-group--invalid quantity-error">{0}</span>'
  var _hasDateError = false
  function _addDateError(validDateGroup, msg) {
    validDateGroup.addClass("has-error")
    validDateGroup.append(dateErrorMsgTemplate.replace('{0}', msg))
  }
  function _validateQuantity() {
    var quantity=$("#quantityNum").val()
    var productCode=$("#applyProduct").val()
    var source=window.okchem_apply_product_source
    if(source==="1"){
      if(0>=quantity||quantity>=appDetail.messageDate[productCode].moq){
        _addDateError($("#applyQuantity"),window.okchemI18_apply_quantityMoreNumber)
        $('#refreshCaptchaId').prev().attr('src','/live-market/captcha/generate?'+Date.now())
        _hasDateError = true
      }else {
        _hasDateError = false
      }
    }else if(source==="2"){
      if(quantity<appDetail.messageDate[productCode].moq){
        _addDateError($("#applyQuantity"),window.okchemI18_apply_quantityLessNumber)
        $('#refreshCaptchaId').prev().attr('src','/live-market/captcha/generate?'+Date.now())
        _hasDateError = true
      }else {
        _hasDateError = false
      }
    }else{
      if(quantity<appDetail.messageDate[productCode].moq){
        _addDateError($("#applyQuantity"),window.okchemI18_apply_quantityLessNumber)
        $('#refreshCaptchaId').prev().attr('src','/live-market/captcha/generate?'+Date.now())
        _hasDateError = true
      }else {
        _hasDateError = false
      }
    }
  }
  function _setCountryCode(value) {
    var $countryCode = $('#buyerCountryCode')
    var code = ''
    window.okchem_countries_data.forEach(function (country) {
      if(country.value === value){
        code = country.code
      }
    })
    $countryCode.val(code)
  }
  var init = function(){
    $('#refreshCaptchaId').bind('click',function () {
      $('#refreshCaptchaId').prev().attr('src','/live-market/captcha/generate?'+Date.now())
    })
    var errorClass = 'form-group--invalid'
    $("#group-apply-form").submit(function(e) {
      e.preventDefault()
    })
    $("#buyerCountry").autocomplete({
      source: window.okchem_countries,
      change: function(event, ui) {
        if(ui.item) _setCountryCode(ui.item.value)
      },
    })
    $('#group-apply-form').validate({
      errorClass: errorClass,
      highlight: function(element) {
        $(element).parent().addClass("has-error")
      },
      unhighlight: function(element) {
        $(element).parent().removeClass("has-error")
      },
      // Rules for form validation
      rules: {
        email: {
          required: true,
          email: true,
          maxlength: 50,
        },
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
          maxlength: 50,
        },
        countryValue:{
          required: true,
          validCountry: true,
        },
        telphone:{
          maxlength: 30,
          required:true,
        },
        productCode:{
          required:true,
        },
        quantity:{
          required:true,
          number: true,
          validDecimal: true,
        },
        referredBy:{
          maxlength: 100,
        },
        codeShown:{
          required:true,
          maxlength: 4,
        },
      },
      messages: {
        email: {
          required: '',
          email: window.okchemI18_apply_emailValid,
        },
        firstName:{
          required:'',
        },
        lastName:{
          required:  '',
        },
        countryValue:{
          required: '',
          validCountry: window.okchemI18_apply_invalidCountry,
        },
        companyName:{
          required:  '',
          maxlength: window.okchemI18_apply_companyLength,
        },
        telphone:{
          required:  '',
        },
        productCode:{
          required:  '',
        },
        quantity:{
          required:  window.okchemI18_apply_quantityRequird,
          number: window.okchemI18_apply_quantityNumber,
          validDecimal: window.okchemI18_apply_quantityValideciaml,
        },
        codeShown:{
          required:  '',
        },
      },

      submitHandler: function() {
        _validateQuantity()
        if(!_hasDateError){
          var data = window.okchem.parseForm2Object($("#group-apply-form"))
          $.ajax({
            headers: {
              "Content-Type":"application/json",
            },
            url: '/live-market/apply-form',
            type: 'POST',
            data: JSON.stringify(data),
            success: function(response) {
              if(response.datas.success){
                window.location.href='/live-market/apply-form/success?gcode='+response.datas.data
              }
            },
            error: function (response) {
              $('#refreshCaptchaId').prev().attr('src','/live-market/captcha/generate?'+Date.now())
              window.okchem.showError(response.responseJSON.errorMsg)

            },
          })
        }
      },
    })

  }
  return{
    init:init,
  }
})()
