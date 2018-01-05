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
  var _pageIndex = 1
  var _pageSize = 10

  function init() {
    _pageIndex = window.OKCHEM_FILTER_PAGE_INDEX
  }


  function gotoNextUrlByPageIndex(pageIndex) {
    _pageIndex = pageIndex
    gotoNextUrl()
  }
  function gotoNextUrl() {
    var pagingStr = '?pageIndex={0}&pageSize={1}'.format(_pageIndex, _pageSize)
    window.location.replace(("/group-buying/application-list{0}").format(
      pagingStr

    ))
  }
  return{
    init:init,
    gotoNextUrlByPageIndex:gotoNextUrlByPageIndex,
  }
})()

$(document).ready(function () {
  pagination.init()
  filter.init()
})
