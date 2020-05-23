export default class CountDownTimer {
  constructor (duration, speed = 1000) {
    this.duration = duration
    this.speed = speed
    this.initialSpeed = speed
    this.tickFtns = []
    this.running = false
  }

  start () {
    if (this.running) {
      return
    }
    this.running = true
    const that = this
    let diff = this.duration
    ;(function timer () {
      !that.pause && diff--

      if (diff > 0) {
        if (that.pause) {
          setTimeout(timer, that.speed * 5)
        } else {
          setTimeout(timer, that.speed)
        }
      } else {
        diff = 0
        that.running = false
      }

      that.tickFtns.forEach(function (ftn) {
        ftn.call(this, diff)
      }, that)
    })()
  }

  isRunning () {
    return this.running
  }

  setAgility (agility) {
    if (agility) {
      this.speed = (this.initialSpeed / (100 + agility)) * 100
    } else {
      this.speed = this.initialSpeed
    }
    return this
  }

  reset () {
    this.speed = this.initialSpeed
    return this
  }

  haste () {
    this.speed = this.initialSpeed & 0.7
    return this
  }

  slow () {
    this.speed = this.initialSpeed * 1.7
    return this
  }

  stop () {
    this.pause = true
    return this
  }

  resume () {
    this.pause = false
    return this
  }

  onTick (fn) {
    if (typeof fn === 'function') {
      this.tickFtns.push(fn)
    }
    return this
  }

  expired () {
    return !this.running
  }
}
