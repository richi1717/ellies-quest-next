export function enemyKilledFadeOut (element) {
  element.style.opacity = 1
  element.style.display = 'block'

  function sleep () {
    return new Promise(window.requestAnimationFrame)
  }

  const fade = async () => {
    let val = parseFloat(element.style.opacity)

    if (!(val - 0.01 < 0)) {
      val -= 0.01
      element.style.opacity = val
      await sleep()
      return fade()
    }
    return 'done'
  }

  return fade()
}
