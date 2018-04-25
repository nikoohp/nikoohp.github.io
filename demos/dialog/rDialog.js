class RDialog {
  constructor(options) {
    this.el = document.querySelector(options.el)
    this.body = document.querySelector('body')
    this.delay = options.delay || 2
    this.type = options.type || 'success'
    this.content = options.content
    this.sep = options.sep
    this.buttons = options.buttons
    this.index = 10000

    this.init()
  }
  init() {
    this.create()
  }
  //
  create() {
    const modal = this.modal = document.createElement('div')
    const dialog = this.dialog = document.createElement('div')

    dialog.className = 'dialog--wrapper'
    dialog.appendChild(this.createClose())
    dialog.appendChild(this.createStatus())
    dialog.appendChild(this.createContent())
    dialog.appendChild(this.createSep())
    dialog.appendChild(this.createButtons())
    setTimeout(() => {
      dialog.classList.add('dialog--show')
    }, 1000/75);

    modal.className = 'dialog--modal'
    modal.style.zIndex = this.index;
    modal.appendChild(dialog)
    modal.addEventListener('click', this.close.bind(this))
    this.body.appendChild(modal)
  }
  // 创建状态栏
  createStatus() {
    const statusElm = document.createElement('div')
    const status = document.createElement('i')
    statusElm.className = 'dialog--status'
    status.className = `dgd-icon icon-${this.type}`
    statusElm.appendChild(status)

    return statusElm
  }
  // 创建内容
  createContent() {
    const contentElm = document.createElement('div')
    contentElm.className = 'dialog--content'
    if (typeof this.content === 'string') {
      contentElm.innerHTML = this.content
    } else {
      contentElm.appendChild(this.content)
    }

    return contentElm
  }
  // 创建分隔栏
  createSep() {
    const sep = this.sep
    const sepElm = document.createElement('div')

    if (this.sep && JSON.stringify(this.sep) !== '{}') {
      sepElm.className = 'dialog--separate'
      // 如果没有时间则不跳转
      if (!sep.time) {
        sepElm.innerText = `${sep.text}`
      } else {
        sepElm.innerText = `${sep.time}秒后将跳转到${sep.text}`
        this.timer = setInterval(() => {
          sep.time--
          sepElm.innerText = `${sep.time}秒后将跳转到${sep.text}`
          if (sep.time <= 0) {
            window.location.href = sep.url
          }
        }, 1000)
      }
    }

    return sepElm
  }
  // 创建按钮
  createButtons() {
    const self = this
    const buttons = this.buttons
    const buttonWrapper = document.createElement('div')
    buttonWrapper.className = 'dialog--buttons'
    if (buttons && buttons.length) {
      buttons.forEach(btn => {
        let cls = btn.hasBg ? 'button--bg' : 'button--no-bg'
        let txt = btn.text
        let button = document.createElement('button')
        let fn = function() {
          btn.cb && btn.cb()
          self.close()
        }
        button.className = `dialog--button ${cls}`
        button.innerText = txt
        button.addEventListener('click', fn)

        buttonWrapper.appendChild(button)
      })
    }
    return buttonWrapper
  }
  // 创建关闭按钮
  createClose() {
    const closeElm = document.createElement('span')
    closeElm.className = 'dialog--close dgd-icon icon-close'
    closeElm.addEventListener('click', (e) => {
      this.close()
      e.stopPropagation()
    })

    return closeElm
  }
  // 关闭事件
  close() {
    clearInterval(this.timer)
    this.body.removeChild(this.modal)
  }
}

window.RDialog = RDialog