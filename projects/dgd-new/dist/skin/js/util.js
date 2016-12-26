$(window).load(function () {
  // $('#loader').delay(800).fadeOut(300);
})

;(function ($) {
  $.extend(jQuery.easing,{
    elasticOut: function(x,t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
      if (t === 0) {
        return b;
      }
      if ( (t /= d) == 1 ) {
        return b+c;
      }
      if (!p) {
        p=d*0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else {
        var s = p/(2*Math.PI) * Math.asin (c/a);
      }
      return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    }

  });
})(jQuery);

var Util=function () {
  //写入缓存
  function store() {
    var Store = {}
    return Store.prototype = {
      _fetch: function (key) {
        // return JSON.parse(window.localStorage.getItem(key) || '[]');
        return JSON.parse(window.localStorage.getItem(key) || null);
      },
      save: function (key, items) {
        window.localStorage.setItem(key, JSON.stringify(items))
      },
      clearOne: function (key) {
        window.localStorage.removeItem(key);
      }
    }
  }
  function time() {
    var Ft = {};
    return Ft.prototype = {
      // 转换时间 年/月/日 时：分：秒
      _convertTime: function (date) {
        var now = new Date().getTime();
        var t1 = date.getTime();
        var year = new Date().getYear() - date.getYear();
        var month = new Date().getMonth() - date.getMonth();
        var leftsecond = parseInt((now - t1)/1000);
        var day=Math.floor(leftsecond/(60*60*24));
        var hour=Math.floor((leftsecond-day*24*60*60)/3600);
        var minute=Math.floor((leftsecond-day*24*60*60-hour*3600)/60);
        var second=Math.floor(leftsecond-day*24*60*60-hour*3600-minute*60);
        var cutTime = {};
        cutTime.year=year;
        cutTime.month=month;
        cutTime.day=day;
        cutTime.hour=hour;
        cutTime.min=minute;
        cutTime.sec=second;
        var result = this._cutTime(cutTime);

        return result ;
      },
      // 转换时间 **前
      _cutTime: function (cutTime) {
        var str = '刚刚';
        if (cutTime.year && cutTime.year > 0) {
          return str = cutTime.year + '年前';
        }
        if (cutTime.month && cutTime.month > 0) {
          return str = cutTime.month + '个月前';
        }
        if (cutTime.day && cutTime.day > 0) {
          return str = cutTime.day + '天前';
        }
        if (cutTime.hour && cutTime.hour > 0) {
          return str = cutTime.hour + '小时前';
        }
        if (cutTime.min && cutTime.min > 0) {
          return str = cutTime.min + '分钟前';
        }
        return str;
      }
    }

  }
  //检测登录
  function checkLogin() {
    return Tools.store._fetch('userInfo');
  }
  //登出
  function loginOut() {
    $.dialog({
      type: 'ok',
      message: '退出成功！',
      delay: 1000,
      effect: true
    })
    return Tools.store.clearOne('userInfo');
  }
  var Tools = {};
  return Tools.store = store(),
         Tools.checkLogin = checkLogin,
         Tools.loginOut = loginOut,
         Tools.fT = time(),
         Tools
}

window.DGDTOOLS=Util();