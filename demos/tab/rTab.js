;(function(win, doc) {
  function Tab(options) {
    this.headers = doc
      .querySelector(options.header)
      .querySelectorAll('[data-toggle="tab"]')
    this.contents = doc
      .querySelector(options.content)
      .querySelectorAll('[data-toggle="tab"]')
    this.clsName = options.className
    this.event = options.event || 'click'
    this.index = options.index || 0
    this.fn = options.cb
    this.init()
  }
  Tab.prototype = {
    constructor: Tab,
    init: function() {
      this._init()
      this._headerToggle()
    },
    // 初始化时显示第几个
    _init: function() {
      var len
      var styles = this._getStyleAttr(this.contents[this.index])
      if (this.headers.length !== this.contents.length) {
        throw Error('标签页和内容页数量不一致')
      }
      len = this.headers.length

      for (var i=0; i<len; i++) {
        this.contents[i].style.display = 'none'
        this.headers[i].classList.remove(this.clsName)
      }
      //
      this.headers[this.index].classList.add(this.clsName)
      this.contents[this.index].setAttribute('style', styles)
    },
    // 头部
    _headerToggle: function() {
      var self = this
      var headers = this.headers
      var len = headers.length
      var ev = this.event === 'hover' ? 'mouseover': this.event

      ;[].slice.call(headers).forEach(function(tab, index) {
        tab.addEventListener(ev, function() {
          // 去除所有class
          for (var i = 0; i < len; i++) {
            headers[i].classList.remove(self.clsName)
          }
          // 点击标签添加class
          tab.classList.add(self.clsName)
          self._contentToggle(index)
        })
      })
    },
    // 内容
    _contentToggle: function(index) {
      var contents = this.contents
      var len = contents.length
      // 将style标签中的display：none删掉
      var styles = this._delDisplay(this._getStyleAttr(contents[index]))
      for (var i=0; i<len; i++) {
        contents[i].style.display = 'none'
      }
      contents[index].setAttribute('style', styles)
      this.fn && this.fn(index)
    },
    // 获取style属性
    _getStyleAttr: function(elem) {
      return elem.getAttribute('style')
    },
    // 删除display：none属性
    _delDisplay: function(str) {
      return str.replace(/(display)\s*:\s*(none)\s*;*/gi, '')
    }
  }
  win.Tab = Tab
})(window, document);