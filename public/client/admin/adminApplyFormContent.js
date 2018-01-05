$(document).ready(function() {
  $.validator.addMethod("validDecimal", function (value, element) {
    return this.optional(element) || /^\d{1,9}(\.\d{1,2})?$/.test(value)
  })
  $.validator.addMethod("validCountry", function (value, element) {
    var isValid = false
    window.okchem_apply_form_country_value.forEach(function (country) {
      if(country.value === value){
        isValid = true
      }
    })
    return this.optional(element) || isValid
  })

  var code = window.okchem_apply_form_group_buying_code
  appDetail.init(window.okchem_apply_form_group_buying_info)
  if(!code){
    code= window.okchem_apply_form_group_buying_info[0].groupBuyingCode
  }
  appDetail.selectedProduct(code)
  appForm.init()
})

var appDetail =(function(){
  var _message={}
  var _selectedGroupBuying=null
  var selectedProduct = function(code){
    $("#applyProduct option[value="+code+"]").attr("selected",true)
    var info=_message[code]
    $("#applyPrice").html(info.currency+" "+info.price+"/"+info.unit)
    $("#applyProductName").html(info.productName)
    $("#applyProductCode").val(info.productCode)
    $("#quantityUnit").html(info.quantityUnit)
  }
  var _cacheDOM=(function(){
    _selectedGroupBuying   = $("#groupBuyingList")
  })
  var init =function(list){
    _cacheDOM()
    if(list){
      list.forEach(function (item) {
        _message[item.groupBuyingCode] = item
      })
    }
    _selectedGroupBuying.bind('change',function () {
      var code=$(this).val()
      var info=_message[code]
      $("#applyPrice").html(info.currency+" "+info.price+"/"+info.unit)
      $("#applyProductName").html(info.productName)
      $("#applyProductCode").val(info.productCode)
      $("#quantityUnit").html(info.quantityUnit)
    })
  }
  return{
    init: init,
    selectedProduct:selectedProduct,
    messageDate:_message,
  }

})()

var appForm =(function(){
  var $firstName=null
  var $lastName=null
  var $companyName=null
  var $telphone=null
  var $country=null
  var $countryCode=null

  var _cacheDOM=(function(){
    $firstName=$("#buyerFirstName")
    $lastName=$("#buyerLastName")
    $companyName=$("#buyerCompanyName")
    $telphone=$("#userTelphone")
    $country=$("#buyerCountry")
    $countryCode=$("#buyerCountryCode")

  })
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
    _cacheDOM()
    var errorClass = 'form-group--invalid'
    $("#group-apply-form").submit(function(e) {
      e.preventDefault()
    })
    $("#buyerCountry").autocomplete({
      source: window.okchem_apply_form_country,
      change: function(event, ui) {
        if(ui.item) _setCountryCode(ui.item.value)
      },
    })

    $("#buyerEmail").blur(function(){
      var email=$(this).val()
      $.ajax({
        headers: {
          "Content-Type":"application/json",
        },
        url: '/admin/apply-form/email?email='+email,
        type: 'GET',
        success: function(response) {
          var userInfo=response.datas.data
          if(userInfo){
            $firstName.val(userInfo.firstName)
            $lastName.val(userInfo.lastName)
            $companyName.val(userInfo.companyName)
            $telphone.val(userInfo.telphone)
            $country.val(userInfo.country)
            $countryCode.val(userInfo.countryCode)
            $("#warnMessage").html("")
          }else{
            $("#warnMessage").html("该账号不存在！在提交集采申请成功后，系统会自动为该用户创建账号")
          }
        },
        error: function (response) {
          window.okchem.showError(response.responseJSON.errorMsg)
        },
      })
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
      },
      messages: {
        email: {
          email: window.okchemI18_apply_emailValid,
        },
        countryValue:{
          validCountry: window.okchemI18_apply_invalidCountry,
        },
        companyName:{
          maxlength: window.okchemI18_apply_companyLength,
        },
        quantity:{
          required:  window.okchemI18_apply_quantityRequird,
          number: window.okchemI18_apply_quantityNumber,
          validDecimal: window.okchemI18_apply_quantityValideciaml,
        },
      },

      submitHandler: function() {
          var data = window.okchem.parseForm2Object($("#group-apply-form"))
          $.ajax({
            headers: {
              "Content-Type":"application/json",
            },
            url: '/admin/apply-form',
            type: 'POST',
            data: JSON.stringify(data),
            success: function(response) {
              if(response.datas.success){
                window.location.href='/admin/application-list'
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
