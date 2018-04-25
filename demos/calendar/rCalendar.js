;(function(win, doc) {
  function rCalendar(selector) {
    if (this instanceof rCalendar) {
      this.ele = doc.querySelector(selector)
      this.year = new Date().getFullYear()
      this.month = new Date().getMonth()+1
      this.init()
    } else {
      return new rCalendar(selector)
    }
  }

  rCalendar.Eles = {}

  rCalendar.prototype = {
    constructor: rCalendar,
    init: function() {
      this.drawCalendar(this.year, this.month)
      this.switch()
      this.showDate(this.year, this.month)
    },
    // 获取月份天数
    _getMonthDays: function(year, month, date) {
      var date = date || 0
      return new Date(year, month, date).getDate()
    },
    // 获取星期几
    _getWeekDay: function(year, month, day) {
      return new Date(year, month - 1, day).getDay()
    },
    // 获取月份跨越几周
    _getWeeksInMonth: function(year, month) {
      var days = this._getMonthDays(year, month)
      var firstDayOfWeekday = this._getWeekDay(year, month, 1)
      var lastDayOfWeekday = this._getWeekDay(year, month, days)
      return Math.ceil((days + firstDayOfWeekday + (6 - lastDayOfWeekday)) /  7)
    },
    //
    drawCalendar: function(year, month) {
      // 每月的天数
      var days = this._getMonthDays(year, month)
      // 每月的第一天是星期几
      var firstDayInWeekday = this._getWeekDay(year, month, 1)
      // 每月的最后一天是星期几
      var lastDayOfWeekday = this._getWeekDay(year, month, days)
      // 每月有几个星期
      var weeks = this._getWeeksInMonth(year, month)
      // 当前展示日历数组
      var dayArrays = []
      // 当前展示日历节点数组
      var container = []

      // 创建节点
      var createElement = function(elem, cls, content) {
        var elem = elem
        var eles = doc.createElement(elem)
        eles.className = cls
        eles.innerText = content

        return eles
      }

      // 补全上个月的天数
      for (var i=0; i<firstDayInWeekday; i++) {
        var value = this._getMonthDays(year, month - 1, i - firstDayInWeekday + 1)
        dayArrays[i] = createElement('span', 'unshow', value)
      }

      // 补全下个月的天数
      // 下个月展示天数(总展示数 - 当月天数 - 上个月展示天数（即每个月第一天的星期数）)
      var nextMonthDays = weeks*7 - days - firstDayInWeekday
      for (var i = 1; i<=nextMonthDays; i++) {
        var value = this._getMonthDays(year, month + 1, i)
        // 下个月展示下标
        var nextMonthIndex = days + firstDayInWeekday + i - 1
        dayArrays[nextMonthIndex] = createElement('span', 'unshow', value)
      }

      // 每个月第一天到最后一天
      for (var j = 1; j <= days; j++) {
        var value = new Date(year, month - 1, j).getDate()
        var index = firstDayInWeekday + j - 1
        // 今日高亮
        var nowYear = new Date().getFullYear()
        var nowMonth = new Date().getMonth()
        var nowDate = new Date().getDate()

        if (nowYear === year && month - 1 === nowMonth && value === nowDate) {
          dayArrays[index] = createElement('span', 'show select', value)
        } else {
          dayArrays[index] = createElement('span', 'show', value)
        }
      }

      console.log(dayArrays)

      var box = doc.querySelector('.date-box')
      // 创建文档片段
      var documentFragment = document.createDocumentFragment()

      for (let i=0, len = dayArrays.length; i<len; i++) {
        // dayArrays
        dayArrays[i].addEventListener('click', () => {
          for (let j=0; j<len; j++) {
            dayArrays[j].classList.remove('select')
          }
          dayArrays[i].classList.add('select')
          console.log(`i: ${i}  --  index: ${nextMonthIndex}`)
          if (i>=nextMonthIndex) {

            self.drawCalendar(this.year, this.month+1)
          }
          const day = dayArrays[i].innerText
          const month = this.month
          const year = this.year
          console.log(`${year}-${month}-${day}`)
        })
        documentFragment.appendChild(dayArrays[i])
      }

      box.innerHTML = ''
      box.appendChild(documentFragment)
    },
    // 点击切换
    switch: function() {
      var self = this
      var btns = doc.querySelectorAll('a')
      var _year = self.year
      var _month = self.month
      for (var i=0; i<btns.length; i++) {

        btns[i].addEventListener('click', function() {
          if (this.dataset.sort == '0') {
            _month--
            if (_month <= 0) {
              _year--
              _month = 12
            }
          }
          if (this.dataset.sort == '1') {
            _month++
            if (_month >= 13) {
              _year++
              _month = 1
            }
          }
          self.year = _year
          self.month = _month
          console.log(` _year: ${_year} | _month: ${_month}`)
          self.drawCalendar(_year, _month)
          self.showDate(_year, _month)
        })
      }

    },
    // input显示
    showDate: function(year, month) {
      var showElem = doc.querySelector('input')
      showElem.value = `${year}-${month}`
    }
  }

  win.rCalendar = rCalendar
})(window, document);