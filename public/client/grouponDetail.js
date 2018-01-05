var groupon = (function () {
  var init = function () {

    $('[data-toggle="popover"]').popover('show')

    textScrollLeft()

    $(window).scroll(function () {
      isFilmInWindow("#supplierFilm")
    })
  }

  function textScrollLeft() {
    var itemWidth = 0
    $(".focus_tab > .normal").each(function () {
      itemWidth += $(this).width() + 10
    })
    var temp = $(".focus_tab > div").clone()
    temp.appendTo(".focus_tab")
    $(".focus_tab").width(itemWidth * 2 + 100)
    var i = 0
    setInterval(play, 18)

    function play() {
      //$(".focus_tab").offset({left:i,top:$(".focus_tab").offset().top});
      $(".focus_tab").css("left", i)
      i -= 1
      //if(Math.abs($(".focus_tab").offset().left)>=sumWidth)
      if (Math.abs(parseInt($(".focus_tab").css("left"))) >= itemWidth) {
        i = 0
      }
    }
  }


  var filmFirstPlay = 0
  var videoUrl = window.OKCHEM_videoUrl
  videoUrl = videoUrl.substring(videoUrl.indexOf('v=')+ 2)

  function isFilmInWindow(div) {
    var a, b, c, d, f
    b = $(window).scrollTop() //监控窗口已滚动的距离;
    c = $(window).height()//浏览器窗口的高度*/
    d = $(div).offset().top
    f = $(div).height()
    a = eval(d - c + f)

    if (b >= a && filmFirstPlay == 0) {


      /* 在 #supplierFilm 加载下面格式的YouTube视频 */
      $("#supplierFilm").html("<iframe width=\"100%\" height='100%' src=\"https://www.youtube.com/embed/" + videoUrl
        + "?rel=0&autoplay=1\" frameborder=\"0\" gesture=\"media\" allow=\"encrypted-media\" allowfullscreen></iframe>")

      /* <iframe width="100%" src="https://www.youtube.com/embed/IWwhYPjyE1U?rel=0&autoplay=1" frameborder="0"
                  gesture="media" allow="encrypted-media" allowfullscreen></iframe> */
      filmFirstPlay = 1
    }
  }

  return {
    init: init,
  }


})()
var referApply = (function () {

  var _validator = null
  function init() {
    $('#refreshCaptchaId').bind('click', function () {
      $('#refreshCaptchaId').prev().attr('src', '/group-buying/captcha/generate?'+Date.now())
    })

    $('#referToAFriend').bind('click', function () {
        $("#yourquestion").val('')
        $("#yourEmail").val('')
        $("#codeShown").val('')
        _validator.resetForm()
      $('#refreshCaptchaId').prev().attr('src', '/group-buying/captcha/generate' + '?' + Math.random())
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

var contactForm = (function () {

  var _validator = null
  function init() {
    $('#contactRefreshCaptchaId').bind('click', function () {
      $('#contactRefreshCaptchaId').prev().attr('src', '/group-buying/captcha/generate' + '?' + Math.random())
    })

    $('#contactUs').bind('click', function () {
      $("#yourEmail2").val('')
      $("#yourQuestion").val('')
      $("#codeShown2").val('')
      _validator.resetForm()
      $('#contactRefreshCaptchaId').prev().attr('src', '/group-buying/captcha/generate' + '?' + Math.random())
    })
    var errorClass = 'form-group--invalid'
    $("#referForm").submit(function (e) {
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
            $('#contactRefreshCaptchaId').prev().attr('src', '/group-buying/captcha/generate' + '?' + Math.random())
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
  groupon.init()
  referApply.init()
  contactForm.init()
})
