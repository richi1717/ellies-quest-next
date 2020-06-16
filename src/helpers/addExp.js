export function addExp (expGain, expFromBattleVar) {
  const exp = expFromBattleVar()
  const newExp = exp + expGain
  expFromBattleVar(newExp)
  return new Promise((resolve) => resolve('done'))
}
