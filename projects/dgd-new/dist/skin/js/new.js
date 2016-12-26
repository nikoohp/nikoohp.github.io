/*
* @Author: suzhihui
* @Date:   2016-12-21 15:19:11
* @Last Modified by:   老苏
* @Last Modified time: 2016-12-23 14:42:55
*/

var newsModel = new Vue({
  el:'#model-news',
  data: {
    //资讯列表
    Ad: '',
    //分类： 全部 众筹 政策 国际 研究 创投
    CategoryMap: ['0','53','54','55','56','57'],
    pageSize: 6,
    currentpage: 1,
    pagination: '',
    // 推荐项目
    Pro: '',
    //推荐文章
    TopNews:''
  },

  updated: function () {
    // var dgdAd = this.$refs.slider;
    // alert('laosu');

  },
  computed: {
  },
  methods: {
    getNewsList: function (category) {
      var ca = category!== undefined?category:'0';
      $("#loader").fadeIn(300)
      this.$http.get(headerModel.api + '/News/GetList?token='+ headerModel.token +'&category='+ca+'&newkey=0&pagesize='+ this.pageSize +'&currentpage='+ this.currentpage).then(function(response) {
          this.Ad = response.data;
          this.pagination = response.data.pagecount
          this.$nextTick(function () {
            this.bannerSlider();
          });
        $("#loader").fadeOut(300)
      })
    },
    // 推荐项目
    getIntPro: function () {
      this.$http.get(headerModel.api + '/ZhongChou/GetList?pagesize=2&state=0&currentpage=1&token=' + headerModel.token).then(function(response) {
        this.Pro = response.data;
      })
    },
    // banner
    bannerSlider: function () {
        var dgdAd = $('#news-banner');
        dgdAd.owlCarousel({
          items:1,
          loop: true,
          autoplay:true,
          autoplayTimeout:5000,
          autoplayHoverPause:true,
          nav:false
        });
    },
    //推荐文章
    getIntNew: function () {
      // http://devapi.zczj.com:80/api/News/GetTopRecommend?count=5&categoryid=0
      this.$http.get(headerModel.api + '/News/GetTopRecommend?count=10&categoryid=0').then(function(response) {
        this.TopNews = response.data;
      })
    },
    timeFormart: function (time) {
      var servertime = new Date().getTime();
      var t1 = new Date(time);

      return DGDTOOLS.fT._convertTime(t1);
    }
  },
  created: function () {
    this.getIntPro();
    this.getNewsList();
    this.getIntNew();
  }
})