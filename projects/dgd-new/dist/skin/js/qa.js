

var qaModel = new Vue({
  el:'#model-qa',
  data:{
    isSearchPop: false
  },
  mounted: function () {
    //问题分类banner
    ;(function () {
      var dgdAd = $('#qa-banner');
      dgdAd.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      });
    })('问题分类banner');
  },
  methods:{
    searchPop: function () {
      this.isSearchPop = !this.isSearchPop;
    },
    searchClose: function () {
      this.isSearchPop = !this.isSearchPop;
    },
    searchForm: function () {
      var keyword = document.querySelector('#searchKey').value;
      if (keyword == '') {
        $.dialog({
          type: 'warning',
          message: '输入问题关键字',
          delay: 2000,
          effect: true,
          delayCallback: function () {
            document.querySelector('#searchKey').focus();
          }
        })
      }else{

      }
    },
    askForm: function () {
      var keyword = document.querySelector('#askVal').value;
      //检测登录
      if (!headerModel.isLogin) {
        (function($) {
          $.dialog({
            type: 'warning',
            message: '请先登录！',
            buttons: [{
              text: '登录',
              type: 'green',
              callback: function() {
                window.location = '/passport/login.html?url='+ window.location;
              }
            }, {
              text: '取消',
              type: 'red'
            }],
            maskClose: true,
            effect: true
          })
        })(jQuery);
        return;
      }


      if (keyword == '') {
        $.dialog({
          type: 'warning',
          message: '输入你遇到的问题',
          delay: 2000,
          effect: true,
          delayCallback: function () {
            document.querySelector('#qaAskForm').focus();
          }
        })
      }else{

      }
    }
  }
})