export function calcExp (level) {
  return 250 * (level * level)
}

export function calcLevel (exp) {
  if (exp < calcExp(2)) {
    return 1
  } else if (exp > 2450250) {
    return 100
  }

  return Math.floor(exp / Math.sqrt(exp * 250))
}

export function calcExpToNextLevel (exp) {
  return calcExp(calcLevel(exp) + 1) - exp
}
