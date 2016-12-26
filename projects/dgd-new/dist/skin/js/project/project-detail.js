var projectDetail = new Vue({
  el: '#detail',
  data: {
    TimesRotation: ['种子期', '天使期', 'pre-A轮', 'A轮', 'B轮', 'C轮'],
    tabShow: 0, //0: 项目详情 1：项目问答  2：跟投人
    detailNavCur: 0,
    detailNav: false,
    isAdd: true,
    wechatShare: false,
    webShare: false,
    detail: {},
    followPersonList: [],
    projectQAList: {},
    proId:''
  },
  methods: {
    toggleTab: function (index) {
      this.tabShow = index
      if (index === 1){
        this.getProjectQAList()
      } else if (index === 2){
        this.getFollowPerson()
      }
    },
    // 获取项目详情信息
    getProjectDetail: function () {
      $("#loader").fadeIn(300)
      // 获取数据
      var url = headerModel.api + '/ZhongChou/Detail/'+ this.proId +'?token=1'
      this.$http.get(url).then(function (response) {
        if (response.data) {
          this.detail = response.data
          this.$nextTick(function(){
            this.getPicWidth()
          })
          $("#loader").fadeOut(300)
        }
      })
    },
    // 获取投资人列表
    getFollowPerson: function () {
      this.followPersonList = this.detail.FollowPerson
    },
    // 获取问答列表
    getProjectQAList: function () {
      var qaurl = headerModel.api + '/ZhongChou/ProjectQAList?projectid='+this.proId
      this.$http.get(qaurl).then(function (response) {
        this.projectQAList = response.data.list
      })
    },
    // 鼠标滚轮事件
    scroll: function () {
      this.navigatorFn()
      this.navigatorPos()
      this.sidebarPos()
    },
    // 导航事件
    navigatorFn: function () {
      $(window).scroll(function(){
        var $items = $('.item-desc').find('.content-item'),
            $menu = $('.detail-nav'),
            $top = $(document).scrollTop(),
            currentId = '',
            currentLink = $menu.find('.current')
        $items.each(function () {
          var _this = $(this)
          // _this.offset().top代表每一个item的顶部位置
          if ($top > _this.offset().top - 200) {
            currentId = '#' + _this.attr('id')
          } else if (true) {
            // currentId = $items.eq($item.length-1).attr('id')
          } else {
            return false
          }
        })

        if (currentId && currentLink.attr('href') !== currentId) {
          currentLink.removeClass("current")
          $menu.find('[href='+currentId+']').addClass("current")
        }
      })
    },
    // 导航位置
    navigatorPos: function () {
      var _this = this
      $(window).scroll(function () {
        var menu = _this.$refs.detailNav,
            box = _this.$refs.container,
            $top = $(document).scrollTop()
        if ($top > box.offsetTop-400) {
          _this.detailNav = true
        } else {
          _this.detailNav = false
        }
      })
    },
    // 侧边栏位置
    sidebarPos: function () {
      var _this = this
      $(window).scroll(function () {
        var sidebar = _this.$refs.sidebar,
            container = _this.$refs.container,
            $top = $(document).scrollTop()
        container.style.minHeight = sidebar.offsetHeight + 'px';
        if ((container.offsetTop - 76) <= $top ) {
          $(sidebar).css({
            'position': 'fixed',
            'width': $(sidebar).parent().width(),
            'top': 76
          })
        } else {
          $(sidebar).css({
            'position': 'relative',
            'top': 0
          })
        }
      })
    },
    // 添加留言问答
    AddProjectQA: function () {
      // 判断登录，登录成功后才能留言
      if (!headerModel.isLogin){
        $.dialog({
          type: 'warning',
          message: '请先登录！',
          buttons: [{
            text: '登录',
            type: 'green',
            callback: function() {
              window.location = '/passport/login.html?url='+window.location.href;
            }
          }, {
            text: '取消',
            type: 'red'
          }],
          maskClose: true,
          effect: true
        })

        return false
      }

      var AddProjectQAUrl = headerModel.api + '/ZhongChou/AddProjectQA';
      $.ajax({
        url: AddProjectQAUrl,
        method: 'POST',
        data: {
          "ProjectID": 1234,
          "Content": "POST提交测试",
          "Token": 1,
          "ParentID": 0
        }}).done(function (res) {
          console.log(res)
        })
    },
    // 判断详情图片宽度
    getPicWidth: function () {
      var imgs = $('.item-desc img')

      imgs.each(function () {
        if( $(this).width() > $(document).width()) {
          $(this).parent('p').css('overflow-x', 'auto')
        }
      })
    },
    // 分享
    share: function () {
      // 移动端的分享
      if (headerModel.isMobileOrTable) {
        this.weChatShare()
        // this.wbShare()
        return false
      }
    },
    // 微信分享
    weChatShare: function () {
      var _this = this
      if (this.isWeixin()){
        this.wechatShare = true
      } else {
        // 不是微信则添加二维码生成库
        this.webShare = true
        // 多次点击只添加一次库文件
        if (this.isAdd) {
          var script=document.createElement('script')
          script.setAttribute('type','text/javascript')
          script.setAttribute('src','/skin/js/project/qrcode.v1.min.js')
          this.isAdd = false
          document.querySelector('head').appendChild(script)
          // 库文件加载完成后再调用二维码生成方法
          script.onload = function () {
            _this.createQrcode()
          }
        } else {
          // 给个延时，当元素显示后再生产二维码
          setTimeout(function () {
            _this.createQrcode()
          }, 40)
        }

      }
    },
    // 微博分享
    wbShare: function (el) {
      var atag = el.querySelector('#WBShare'),
          shareUrl = '',
          localUrl = window.location.href,
          shareTitle = this.project.name + ' - ' + this.project.desc,
          shareContent = shareTitle,
          sharePic = 'http://m.zczj.com/images/logo.png';
          // "http://v.t.sina.com.cn/share/share.php?url={$url}&title={$title}&content={$content}&pic={$pic}"
      shareUrl = 'http://v.t.sina.com.cn/share/share.php?url='+localUrl+'&title='+shareTitle+'&content='+shareContent+'&pic='+sharePic
      atag.setAttribute('href', shareUrl)
    },
    // 微信判断
    isWeixin: function () {
      var userAgentString = window.navigator ? window.navigator.userAgent : "";
      var weixinreg = /MicroMessenger/i;
      var androidreg = /android/i;
      if (!weixinreg.test(userAgentString) ) {
          return false;
      }
      return true;
    },
    // 生成二维码
    createQrcode: function () {
      var shareUrl = window.location.href
      qr.canvas({
        canvas: document.querySelector('#canvas'),
        value: shareUrl,
        size: 8,
        cb: function(width, len, px) {
            var el = document.querySelector('#canvas');
            var val = 25;
            if (width < (25*8 - 10)) {
                val = Math.floor((250 - width) / 2);
            }
            el.style.marginLeft = val+"px";
            el.style.marginTop = val+"px";
        }
      });
    }
  },
  computed: {
    // 计算总的跟投人数
    totalFollowPerson: function () {
      if (this.detail){
        return this.detail.FollowPerson.length
      }
    }
  },
  mounted: function () {
    //仿路由联调（暂时加一下）套程序后替换。。老苏
    this.proId = window.location.search.split('id=')[1] || 0;
    if(this.proId == 0){
      window.location.href='./index.html'
      return false
    }
    // 获取信息事件
    this.getProjectDetail()
    // 判断PC端才有滚动事件
    if (!headerModel.isMobileOrTable) {
      this.scroll()
    }

  }
})
