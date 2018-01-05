var pagination = (function () {
  function init() {
    if(window.OKCHEM_FILTER_PAGE_COUNT){
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
  return{
    init:init,
  }
})()

var filter = (function () {
  var $groupBuyingChange=null
  var _pageIndex = 1
  var _pageSize = 10
  var _groupBuyingCode=''

  function init() {
    _cacheDOM()
    _pageIndex = window.OKCHEM_FILTER_PAGE_INDEX
    _groupBuyingCode=window.OKCHEM_ADMIN_CONTACT_US_CODE
    $groupBuyingChange.val(_groupBuyingCode)
  }

  function search(){
    $groupBuyingChange.change(function(){
      _groupBuyingCode=$(this).val()
      gotoNextUrlByPageIndex(1)

    })
  }

  function _cacheDOM() {
    $groupBuyingChange = $('#groupBuyingChange')
  }

  function gotoNextUrlByPageIndex(pageIndex) {
    _pageIndex = pageIndex
    gotoNextUrl()
  }
  function gotoNextUrl() {
    var pagingStr = '?pageIndex={0}&pageSize={1}&groupBuyingCode={2}'.format(_pageIndex, _pageSize,_groupBuyingCode)
    window.location.replace(("/admin/contact-us-list{0}").format(
      pagingStr

    ))
  }
  return{
    init:init,
    gotoNextUrlByPageIndex:gotoNextUrlByPageIndex,
    search:search,
  }
})()

$(document).ready(function () {
  pagination.init()
  filter.init()
  filter.search()
})
