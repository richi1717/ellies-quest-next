import { expFromBattleVar } from '../cache'

export function addExp (expGain) {
  const exp = expFromBattleVar()
  const newExp = exp + expGain

  expFromBattleVar(newExp)

  return new Promise((resolve) => resolve('done'))
}
