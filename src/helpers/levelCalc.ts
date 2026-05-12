export function calcExp(level: number): number {
  return 250 * (level * level)
}

export function calcLevel(exp: number): number {
  if (exp < calcExp(2)) return 1
  if (exp > 2_450_250) return 100
  return Math.floor(exp / Math.sqrt(exp * 250))
}

export function calcExpToNextLevel(exp: number): number {
  return calcExp(calcLevel(exp) + 1) - exp
}
