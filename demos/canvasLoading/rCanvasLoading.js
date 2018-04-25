class CanvasLoading {
  constructor (options) {
    this.elem = document.querySelector(options.el)
    this.percent = options.percent || 0
    this.text = this.percent < 0 ? 0 : this.percent > 100 ? 100 : this.percent
    this.width = options.width || 5
    this.baseColor= options.baseColor || '#ccc'
    this.activeColor = options.activeColor || '#000'
    this.animate = typeof options.animate === 'undefined' ? true : options.animate === false ? false : true
    // 对象
    this.context = this.elem.getContext('2d')
    // 中心坐标
    this.centerX = this.elem.width / 2
    this.centerY = this.elem.height / 2
    //将360度分成100份，那么每一份就是rad度
    this.rad = Math.PI*2/100
    // 半径
    this.radius = this.centerX - this.width
    this.n = 0
    this.t = 0
    this.init()
  }
  init() {
    if (this.animate) {
      this.animation()
    } else {
      this.static()
    }
  }
  // 动态绘制
  animation() {
    const ctx = this.context
    // 动态绘制前，先清除画布上上一次的绘制
    ctx.clearRect(0, 0, this.elem.width, this.elem.height)
    // 绘制底层圆环
    this.drawCircle(100, this.baseColor)

    this.n++
    if ((this.percent-100) > 0) {
      this.t += (this.percent - 100)/100 + 1
    } else {
      this.t++
    }
    // 边界情况处理
    if (this.t >= this.percent)  this.t = this.percent
    if (this.n >= 100)  this.n = 100
    // 递归调用
    if (this.t < this.percent) {
      window.requestAnimationFrame(this.animation.bind(this))
    }
    // 绘制进度圆环
    this.drawCircle(this.n, this.activeColor)
    // 绘制文字
    this.drawText(Math.round(this.t))
  }
  // 静态绘制
  static() {
    this.drawCircle(100, this.baseColor)
    this.drawCircle(this.text, this.activeColor)
    this.drawText(this.percent)
  }
  // 绘制圆环
  drawCircle(n, color) {
    const ctx = this.context
    //设置描边样式
    ctx.strokeStyle = color
    //设置线宽
    ctx.lineWidth = this.width
    //路径开始
    ctx.beginPath()
    //用于绘制圆弧ctx.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    ctx.arc(this.centerX, this.centerY, this.radius, -Math.PI / 2, -Math.PI/2 +n*this.rad, false)
    //绘制
    ctx.stroke()
    //路径结束
    ctx.closePath()
  }
  // 绘制文字
  drawText(text) {
    const ctx = this.context
    const disWidth = text < 100 ? 0 : 10

    ctx.font = '24px PT Sans'
    ctx.fillStyle = this.activeColor
    ctx.fillText(`${text}`, this.centerX - ctx.measureText(this.percent).width / 2 - disWidth, this.centerY + 10)
    ctx.font = '14px PT Sans'
    ctx.fillText('%', this.centerX + ctx.measureText(this.percent).width / 2 + 5, this.centerY + 10)
  }
}

window.rCanvasLoading = CanvasLoading