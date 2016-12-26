var getType = window.location.href.split('?')[1] || 'error'
new Vue({
  el: '#success',
  data: {
    formShow: false,
    from: false,
    number: 5,
    fpwd: false
  },
  computed: {
    type: function () {
      if (getType == 'login') {
        this.from = false
        return '登录'
      } else if (getType == 'register') {
        this.from = true
        return '注册'
      } else if (getType == 'fpwd') {
        this.fpwd = true
        return '找回密码'
      } else {
        // window.location.href='/'
        // return
      }
    },
    // 计算countdown值
    countdown: function () {
      var timer = null, _this=this//, number = 10
      return timer = setInterval(function () {
        _this.number--
        if (_this.number<=0) {
          clearInterval(timer)
        }
        return _this.number
      }, 1000)
    }
  },
  mounted: function () {
    var timer = null,  _this = this
    timer = setInterval(function () {
      _this.number--
      if (_this.number<=0) {
        clearInterval(timer)
        // window.location.href = window.location.search.split('url=')[1] || '/';

      }
    }, 1000)
  }
})