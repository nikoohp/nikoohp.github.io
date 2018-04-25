class RAudio {
  constructor(options) {
    this.el = document.querySelector(options.el)
    this.url = options.url
    this.volume = options.volume || 50
    this.loop = (options.loop || options.loop === undefined) ? true : false
    this.autoplay = options.autoplay === true

    const ELEMS = [].slice.call(this.el.querySelectorAll('[data-audio]'))
    ELEMS.forEach(elem => {
      this[elem.dataset.audio] = elem
    })
    this.progressWidth = this.progress.parentNode.offsetWidth

    this.init()
  }
  init(){
    this.createAudio()

    // 加载完成后
    this.audio.addEventListener('loadeddata', () => {
      this.duration = this.audio.duration
      // 设置时间
      this.updateTime(this.duration)
      // 自动播放
      if (this.autoplay) {
        this.pauseAll()
        this.audio.play()
      }
      this._play()

      // 进度控制
      this.progressEv()
      // 音量控制
      this.volumeEv()
    })
    // 播放时触发的更新
    this.audio.addEventListener('timeupdate', () => {
      // 当前时间
      const cur = this.audio.currentTime
      // 剩余时间
      const rest = this.duration - cur
      // 当前时间对应的进度条宽度
      const width = cur / this.duration * 100

      this.updateTime(rest)
      this._updateProgress(width)
      this.updatePlayIcon()
    })

  }
  // 创建audio节点及对象
  createAudio() {
    this.audio = document.createElement('audio')
    this.audio.src = this.url
    this.audio.loop = this.loop
    this.el.appendChild(this.audio)
  }
  // 更新时间
  updateTime(time) {
    let t = parseInt(time)
    let minites = parseInt(t / 60)
    let sec = t - minites * 60

    minites = minites < 10 ? `0${minites}` : minites
    sec = sec < 10 ? `0${sec}` : sec
    this.time.innerText = `${minites}:${sec}`
  }
  // 更新按钮图标
  updatePlayIcon() {
    const cls = this.audio.paused ? 'icon-play' : 'icon-pause'
    this.play.className = `dgd-icon ${cls}`
  }
  // 进度事件
  progressEv() {
    this._updateProgress(0)
    this._progressDrag()
  }
  // 进度条
  _updateProgress(v) {
    this.progress.style = `width: ${v}%`
  }
  // 更新当前时间
  _updateCurrentTime(v) {
    const curTime = (v * this.duration) / 100
    this.audio.currentTime = curTime
  }
  _progressDrag() {
    this.drag(this.progress, this._updateCurrentTime.bind(this))
  }
  // 播放/暂停按钮点击
  _play() {
    function cb() {
      if (this.audio.paused) {
        this.pauseAll()
        this.audio.play()
      } else {
        this.pauseAll()
      }
    }
    this.play.addEventListener('click', cb.bind(this))
  }
  // 音量事件
  volumeEv() {
    // 初始化时设置音量
    this._updateVolume(this.volume)
    // 音量拖拽
    this._volumeDrag()
    // 静音
    this._mute()
  }
  // 音量
  _updateVolume(v) {
    this.audio.volume = v / 100
    this.volumebar.style = `width: ${v}%`
  }
  // 音量拖拽
  _volumeDrag() {
    this.drag(this.volumebar, this._updateVolume.bind(this))
  }
  // 静音
  _mute() {
    let flag = false
    let tempVolume
    this.mute.addEventListener('click', () => {
      if (!flag) {
        tempVolume = this.audio.volume * 100
        this._updateVolume(0)
      } else {
        this._updateVolume(tempVolume)
      }
      flag = !flag
    })
  }
  // 进度条点击
  drag(el, fn) {
    const parent = el.parentNode

    function cb(e) {
      const dis = e.offsetX / parent.offsetWidth
      const percent = (dis >= 1 ? 1 : dis <= 0 ? 0 : dis) * 100
      fn(percent)
    }
    // 点击
    parent.addEventListener('click', cb)
  }
  // 暂停所有audio
  pauseAll() {
    [].slice.call(document.querySelectorAll('audio')).forEach(audio => audio.pause())
  }
}

window.RAudio = RAudio