;
(function () {
  var Utils = {
    // 合并对象
    extend: function (o, p) {
      for (var prop in p) {
        o[prop] = p[prop];
      }
      return o;
    },
    // 获取浏览器支持情况
    getSupport: function (property) {
      var support = '',
        list = ['Webkit', 'Moz', 'ms', 'O'],
        divStyle = document.createElement('div').style;

      property = property.toLowerCase();
      list.forEach(function (item, index) {
        list[index] = item + property.replace(/^\S/, function (s) {
          return s.toUpperCase()
        })
      })
      list.unshift(property)
      for (var i = 0, len = list.length; i < len; i++) {
        if (list[i] in divStyle) {
          support = list[i]
        }
      }
      return support;
    }
  }


  var Alert = function (options) {
    options = options || {};

    if (this instanceof Alert) {
      this.config = {
        type: 'warning',
        msg: '',
        delay: 2000,
        maskEffect: true
      }
      // 弹窗组件节点
      this.alertComponent = null;
      // 验证参数
      if (typeof options === 'string') {
        this.config.msg = options;
      } else if (Object.prototype.toString.call(options) !== '[object Object]') {
        throw TypeError('options should be a object')
      }
      // 合并参数
      Utils.extend(this.config, options);

      // 初始化
      this.init();
    } else {
      return new Alert(options)
    }
  }

  // 原型
  Alert.prototype = {
    // 初始化
    init: function () {
      this.createLayout();
    },
    // 创建布局
    createLayout: function () {
      var alert_coomponent, type,
        type = 'alert__icon-' + this.config.type,
        alert_component = document.createElement('article'),
        alert_container = document.createElement('section');

      alert_component.className = '__alert_component__';
      alert_container.className = 'alert__container';
      alert_container.innerHTML = '<div class="alert__content"><div class="alert__content-icon"><i class="alert__icon ' + type + '"></i></div><div class="alert__content-msg">' + this.config.msg + '</div></div>';
      // 
      alert_component.appendChild(alert_container);
      // 添加按钮
      this.createButton(alert_container);
      // 创建mask层
      this.createMask(alert_component);
      // 将弹窗组件添加到body底部
      document.body.appendChild(alert_component);

    },
    // 创建按钮
    createButton: function (parent) {
      var _this_ = this,
        button_wrapper,
        button,
        buttonLen = this.config.buttons ? this.config.buttons.length : 0;

      button_wrapper = document.createElement('div');
      button_wrapper.className = 'alert__button';

      if (buttonLen > 0) {
        for (var i = 0; i < buttonLen; i++) {
          var text = this.config.buttons[i].text,
            type = this.config.buttons[i].type,
            color = this.config.buttons[i].color
          // 如果没有text, 抛出错误
          if (!text) {
            throw Error('text should be required')
          }

          button = document.createElement('button');
          button.className = 'J_alert_button button';
          button.innerText = text;
          button.style.width = 100 / buttonLen + '%';
          button.index = i;
          // 根据不同的配置设置不同的按钮样式
          if (!type && color) {
            button.style.background = color;
          } else if (!type && !color) {
            button.classList.add('button-success')
          } else {
            button.classList.add(type)
          }

          // 处理按钮的回调函数
          button.addEventListener('click', function () {
            var cb = _this_.config.buttons[this.index].callback;
            // 回调函数存在并且不为空函数
            if (cb && cb != 'function () {}') {
              if (typeof cb !== 'function') {
                throw TypeError('callback should be a function')
              }
              cb();
            } else {
              _this_.close();
            }
          }, false)

          button_wrapper.appendChild(button)
        }
      } else {
        // 当没有按钮并且延时时间大于等于0毫秒时,自动隐藏
        if (this.config.delay) {
          setTimeout(function () {
            _this_.close();
          }, this.config.delay)
        }
      }
      parent.appendChild(button_wrapper);
    },
    // 创建蒙版层
    createMask: function (parent) {
      var _this_ = this,
        maskEffect = this.config.maskEffect,
        container = parent.firstChild,
        // 创建节点
        mask = document.createElement('section');
      // 设置class
      mask.className = 'alert__mask';
      // 添加
      parent.appendChild(mask);
      // 绑定事件
      /**
       * 当设置了maskEffect=true,并且
       */
      if (maskEffect && this.config.delay <= 0) {
        mask.addEventListener('click', function () {
          _this_.close(container);
        }, false)
      }

    },
    // 关闭事件
    close: function () {
      var transform = Utils.getSupport('transform'),
        transition = Utils.getSupport('transition'),
        transitionend = {
          'transition': 'transitionend',
          'msTransition': 'MSTransitionEnd',
          'OTransition': 'oTransitionEnd',
          'MozTransition': 'transitionend',
          'WebkitTransition': 'webkitTransitionEnd'
        },
        elem = document.querySelector('.alert__container');
      elem.style[transform] = 'translate(-50%, -100%)';
      elem.nextSibling.style.display = 'none';
      elem.addEventListener(transitionend[transition], function () {
        document.body.removeChild(elem.parentNode);
      }, false)
    }
  }

  window.alert = Alert;
})();
