/**
 * Marquee 无缝滚动封装
 * > IE8
 */
;
(function () {

  var Utils = {
    // 1, 合并对象
    extend: function (o, p) {
      for (var prop in p) {
        o[prop] = p[prop]
      }
      return o;
    },
    // 2, 检测浏览器对property的兼容性
    getSupport: function (property) {
      var support = '',
        divStyle = document.createElement('div').style,
        list = ['webkit', 'moz', 'ms', 'o'];
      list.forEach(function (item, i) {
        // 正则(首字母大写): \S: 非空字符; ^: 开头
        list[i] = item + property.replace(/^\S/, function (s) {
          return s.toUpperCase();
        });
      })
      // 插入数组开头
      list.unshift(property);
      for (var i = 0, len = list.length; i < len; i++) {
        if (list[i] in divStyle || list[i] in window) {
          support = list[i];
          break;
        }
      }
      return support;
    }
  }

  // 私有变量
  var transform = Utils.getSupport('transform');

  var Marquee = function (options) {
    // 如果不传参数,
    options = options || {};
    // 默认参数
    this.config = {
      speed: 5,
      dir: 'left'
    }
    // 元素初始位置
    this.pos = {
      x: 0,
      y: 0
    }
    // 元素移动位置
    this.target = {
      x: 0,
      y: 0
    };
    // 目标元素宽度
    this.width = 0;
    // 目标元素高度
    this.height = 0;
    // 暂停
    this.pause = false;
    // 检查参数格式
    // 如果不是对象,抛出类型错误
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      throw TypeError('options should be object')
    }
    // 合并参数
    Utils.extend(this.config, options);
    // 如果传入的是DOM对象,则直接使用,否则获取DOM对象
    this.elem = typeof this.config.selector === 'object' ? this.config.selector : document.querySelector(this.config.selector);

    // 初始化
    this.init();
  }
  // 原型
  Marquee.prototype = {
    // 构造函数
    constructor: Marquee,
    // 初始化
    init: function () {
      this.start();
    },
    // 复制子元素
    repeat: function () {
      // 复制节点
      var _div_ = document.createElement('div'),
        // 设置宽度
        singleDom = this.elem.children[0],
        marginLeft = parseInt(this.getStyle(singleDom, 'marginLeft')),
        marginRight = parseInt(this.getStyle(singleDom, 'marginRight')),
        marginTop = parseInt(this.getStyle(singleDom, 'marginTop')),
        marginBottom = parseInt(this.getStyle(singleDom, 'marginBottom')),
        _width_ = singleDom.getBoundingClientRect().width,
        _height_ = singleDom.getBoundingClientRect().height;

      // 设置视口
      this.elem.style.overflow = 'hidden';
      // 计算宽高
      this.width = (marginLeft + marginRight + _width_) * this.elem.children.length;
      this.height = (marginTop + marginBottom + _height_) * this.elem.children.length;
      _div_.className = 'J_marquee';
      _div_.innerHTML = this.elem.innerHTML + this.elem.innerHTML;
      // 设置宽高
      if (this.config.dir === 'left' || this.config.dir === 'right') {
        _div_.style.height = '100%';
        _div_.style.width = this.width * 2 + 'px';
      } else if (this.config.dir === 'top' || this.config.dir === 'bottom') {
        this.elem.style.height = this.height + 'px';
      }
      // 如果向右运动设置初始位置,右对齐
      if (this.config.dir === 'right') _div_.style[transform] = 'translateX(-' + this.width + 'px)';
      // 如果向下运动设置初始位置,底部对齐
      if (this.config.dir === 'bottom') _div_.style[transform] = 'translateY(-' + this.height + 'px)';
      this.elem.innerHTML = '';
      this.elem.appendChild(_div_);
    },
    // 获取元素样式
    getStyle: function (oDom, property) {
      return window.getComputedStyle(oDom, false)[property];
    },
    // 开始
    start: function () {
      var _this_ = this;
      // 克隆节点
      this.repeat();
      // 先获取初始的transform值
      var transformValue = this.getStyle(this.elem.children[0], transform);
      if (transformValue !== 'none') {
        var temp = transformValue.split(', ');
        this.pos = {
          x: parseInt(temp[4]),
          y: parseInt(temp[5])
        }
      }
      // 将初始状态赋值给目标状态
      Utils.extend(this.target, this.pos);
      // 鼠标移入暂停
      this.elem.addEventListener('mouseenter', function () {
        _this_.pause = true;
      }, false);
      // 鼠标移出继续运动
      this.elem.addEventListener('mouseleave', function () {
        _this_.pause = false;
        _this_.animate();
      }, false);

      this.animate()
    },
    // 运动方法
    animate: function () {
      var _this_ = this,
        requestAnimationFrame = Utils.getSupport('requestAnimationFrame');
      // 速度计算
      this.target.x += (parseInt(this.config.speed) / 5);
      this.target.y += (parseInt(this.config.speed) / 5);
      // 向左
      if (this.config.dir === 'left') {
        if (this.target.x >= this.width) {
          this.target.x = this.pos.x
        }
        this.animateX(-this.target.x)
      }
      // 向右
      if (this.config.dir === 'right') {
        if (this.target.x >= 0) {
          this.target.x = this.pos.x
        }
        this.animateX(this.target.x)
      }
      // 向上
      if (this.config.dir === 'top') {
        if (this.target.y >= this.height) {
          this.target.y = this.pos.y
        }
        this.animateY(-this.target.y)
      }
      // 向下
      if (this.config.dir === 'bottom') {
        if (this.target.y >= 0) {
          this.target.y = this.pos.y
        }
        this.animateY(this.target.y)
      }
      // 浏览器支持requestAnimationFrame
      if (requestAnimationFrame) {
        if (!_this_.pause) {
          // 使用bind,将this绑定到Marquee对象上
          window[requestAnimationFrame](this.animate.bind(this))
        }
      } else {
        // 不支持requstAnimationFram,使用setTimeout
        if (!_this_.pause) {
          setTimeout(this.animate.bind(this), 16.667);
        }
      }
    },
    // X轴运动
    animateX: function (speed) {
      this.elem.children[0].style[transform] = 'translateX(' + speed + 'px)';
    },
    // Y轴运动
    animateY: function (speed) {
      this.elem.children[0].style[transform] = 'translateY(' + speed + 'px)';
    }

  }

  /**
   * 私有方法
   */


  // 暴露接口
  window.Marquee = Marquee;
})();