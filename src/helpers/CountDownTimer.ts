export default class CountDownTimer {
  private duration: number
  private speed: number
  private initialSpeed: number
  private tickFtns: Array<(diff: number) => void>
  private running: boolean
  private pause: boolean

  constructor(duration: number, speed = 1000) {
    this.duration = duration
    this.speed = speed
    this.initialSpeed = speed
    this.tickFtns = []
    this.running = false
    this.pause = false
  }

  start() {
    if (this.running) return
    this.running = true
    let diff = this.duration
    const tick = () => {
      if (!this.pause) diff--
      if (diff > 0) {
        setTimeout(tick, this.pause ? this.speed * 5 : this.speed)
      } else {
        diff = 0
        this.running = false
      }
      this.tickFtns.forEach((fn) => fn.call(this, diff))
    }
    tick()
  }

  isRunning() {
    return this.running
  }

  setAgility(agility: number) {
    this.speed = agility
      ? (this.initialSpeed / (100 + agility)) * 100
      : this.initialSpeed
    return this
  }

  reset() {
    this.speed = this.initialSpeed
    return this
  }

  stop() {
    this.pause = true
    return this
  }

  resume() {
    this.pause = false
    return this
  }

  onTick(fn: (diff: number) => void) {
    if (typeof fn === 'function') this.tickFtns.push(fn)
    return this
  }

  expired() {
    return !this.running
  }
}
