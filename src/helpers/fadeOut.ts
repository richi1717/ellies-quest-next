export function enemyKilledFadeOut(element: HTMLElement): Promise<string> {
  element.style.opacity = '1'
  element.style.display = 'block'

  const sleep = () => new Promise<number>(window.requestAnimationFrame)

  const fade = async (): Promise<string> => {
    const val = parseFloat(element.style.opacity)
    if (val - 0.01 >= 0) {
      element.style.opacity = String(val - 0.01)
      await sleep()
      return fade()
    }
    return 'done'
  }

  return fade()
}
