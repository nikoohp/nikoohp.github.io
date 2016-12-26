var headerModel = new Vue({
    el: "#header",
    data: {
      tag: false,
      api:'http://devapi.zczj.com:80/api',
      navs: [
        {title:'首页', url:'/index'},
        {title:'投资项目', url:'/index'},
        {title:'股权转让', url:'/index'},
        {title:'质押贷款', url:'/index'},
        {title:'新手指引', url:'/index'},
        {title:'关于我们', url:'/index'}
      ],
      isLogin: false, //是否登录
      userInfo: null,
      token: '',
      isMobileOrTable: false // 当前视口宽度是否是处于非PC样式
    },
    methods: {
      showMean: function() {
        this.tag = !this.tag;
        document.querySelector('html').className = 'holding'
        document.querySelector('body').className = 'holding'
      },
      closeMean: function() {
        this.tag = !this.tag;
        document.querySelector('html').className = '';
        document.querySelector('body').className = '';
      },
      checkLogin: function(){
        if (DGDTOOLS.checkLogin()) {
          this.isLogin = true;
        }else{
          this.isLogin = false;
        }
      },
      loginOut: function () {
        DGDTOOLS.loginOut();
        this.isLogin =! this.isLogin;
        this.token='';
      },
      //检测视口宽度，
      checkPlat: function (width) {
        if (width <= 800) {
          this.isMobileOrTable = true;
        }else{
          this.isMobileOrTable = false;
        }
      }
    },
    created: function () {
      var _this = this;
      this.checkLogin();
      this.userInfo = DGDTOOLS.store._fetch('userInfo');
      this.token = DGDTOOLS.store._fetch('userInfo')?DGDTOOLS.store._fetch('userInfo').token:'';

      this.checkPlat(window.innerWidth);

      window.onresize = function () {
        _this.checkPlat(window.innerWidth)
      }
    }
  })
