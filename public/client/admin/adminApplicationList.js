var filter = (function () {

   var _pageIndex = 1
   var _pageSize = 10
   var gbId = 0
   var ownerEmail = 'gordon.peng@okchem.com'
   var $selectgbIds = null
   var $selectedId = null

  function _cache() {
    $selectgbIds = $('#selectgbIds')
  }
  function init() {

     _cache()
    _pageIndex = window.OKCHEM_FILTER_PAGE_INDEX
    _pageSize = window.OKCHEM_FILTER_PAGE_SIZE
    $selectedId = window.OKCHEM_SELECTED_GB_ID
    $selectgbIds.val($selectedId)
    $selectgbIds.change(function () {

      gbId = $("option:selected",$selectgbIds ).val()
      gotoNextUrlByPageIndex(1)
    })
  }

  function gotoNextUrlByPageIndex(pageIndex) {
    _pageIndex = pageIndex
    gotoNextUrl()
  }

  function gotoNextUrl() {
    var pagingStr = '?viewIndex={0}&viewSize={1}'.format(_pageIndex, _pageSize)
    var id = '&gbId={0}'.format(gbId)
    var email = '&ownerEmail={0}'.format(ownerEmail)
    window.location.replace(("/admin/application-list{0}{1}{2}").format(
      pagingStr,
      id,
      email
    ))
  }
  return{
     init: init,
     gotoNextUrlByPageIndex:gotoNextUrlByPageIndex,
  }

})()
var pagination = (function () {
  function init() {
    const totalPage = Math.ceil(window.OKCHEM_FILTER_PAGE_COUNT / window.OKCHEM_FILTER_PAGE_SIZE)
    if(totalPage > 0) {
      $('#pagination').twbsPagination({
        totalPages: Math.ceil(window.OKCHEM_FILTER_PAGE_COUNT / window.OKCHEM_FILTER_PAGE_SIZE),
        startPage: window.OKCHEM_FILTER_PAGE_INDEX,
        visiblePages: 7,
        first: window.OKCHEM_I18N.first,
        prev: window.OKCHEM_I18N.previous,
        next: window.OKCHEM_I18N.next,
        last: window.OKCHEM_I18N.last,
        onPageClick: function (event, page) {
          if (page !== window.OKCHEM_FILTER_PAGE_INDEX) filter.gotoNextUrlByPageIndex(page)
        },
      })
    }
  }

  return {
    init: init,
  }
})()
var assignForm = (function () {

  var assignModal = null
  var $showAssign = null
  var $customerServiceStaff = null
  var $operator = null
  var $itemId = null
  //var showAssignId = null

  function _cache() {
    assignModal = $('#assignModal')
    $showAssign = $('.showAssign')
    $customerServiceStaff = $('#customerServiceStaff')
    $operator = $('#operator')
    $itemId = $('#itemId')
  }
   function init() {

     _cache()
     $showAssign.click(function () {
       const showApplicationId = $(this).val()
       var newArray = window.OKCHEM_APPLICATION_LIST.filter(function (el) {
         return el.id.toString() === showApplicationId

       })
       $customerServiceStaff.val(newArray[0].customerServiceStaff)
       $operator.val(newArray[0].operator)
       $itemId.val(newArray[0].id)
       assignModal.modal('show')
     })
   }

   $('#assignForm').validate({

     highlight: function(element) {
       $(element).parent().addClass("has-error")
     },
     unhighlight: function(element) {
       $(element).parent().removeClass("has-error")
     },
     submitHandler: function(form) {

       $.ajax({
         headers: {
           "Content-Type":"application/json",
         },
         url: '/admin/application-list/assign',
         type: 'POST',
         data: JSON.stringify($(form).serializeFormJSON()),
         success: function() {
           assignModal.modal('hide')
           location.reload()
         },
         error: function (response) {
           window.okchem.showError(response.responseJSON.errorMsg)

         },
       })
     },
   })
   return {
     init: init,
   }

})()
$(document).ready(function () {
  /* open assign modal */

  $('.assign-btn').click(function () {
    event.stopPropagation()
    $('#assignModal').modal()
  })

  $('#downList').click(function () {

    var postData = {}
    postData.viewIndex = 0
    postData.viewSize = 10
    postData.gbId = 0
    postData.ownerEmail = ''
    $.ajax({
      headers: {
        "Content-Type":"application/json",
      },
      url: '/admin/application-list/download',
      type: 'POST',
      data: JSON.stringify(postData),
      success: function(data) {
        window.open(data.downloadUrl)
      },
      error: function (response) {
        window.okchem.showError(response.responseJSON.errorMsg)

      },
    })
  })
  pagination.init()
  filter.init()
  assignForm.init()
})

