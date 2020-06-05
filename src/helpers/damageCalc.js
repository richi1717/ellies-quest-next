import { random } from 'lodash'
import { calcLevel } from './levelCalc'

export const getBaseDamage = (targeter) => {
  const str = targeter.str
  const lvl = calcLevel(targeter.exp) || 1

  return str + ((str + lvl) / 3.2) * ((str * lvl) / 3.2)
}

export const getBaseMagicDamage = (targeter) => {
  const magic = targeter.magic
  const lvl = calcLevel(targeter.exp)

  return magic + ((magic + lvl) / 2.8) * ((magic * lvl) / 2.8)
}

export const damageCalculation = (targeter, target) => {
  const critical = random(1, 100) % 26 === 0
  const power = critical ? random(3.1, 3.6) : random(1.9, 2.5)
  const def = target.def
  const base = getBaseDamage(targeter)
  let dmg = Math.ceil((power * (512 - def) * base) / (1.6 * 512))

  if (target.defending) {
    dmg = Math.ceil(dmg / 2)
  }

  dmg = dmg > 0 ? dmg : 1
  dmg = dmg > target.currentHp ? target.currentHp : dmg

  return dmg
}

export const magicDamageCalculation = (targeter, target) => {
  const power = random(4.3, 4.6)
  const def = target.magicDef
  const base = getBaseMagicDamage(targeter)
  let dmg = Math.ceil((power * (512 - def) * base) / (1.5 * 512))

  dmg = dmg > 0 ? dmg : 1
  dmg = dmg > target.currentHp ? target.currentHp : dmg

  return dmg
}

export const magicHealCalculation = (targeter) => {
  const power = random(2.0, 2.4)
  const base = getBaseMagicDamage(targeter)
  return Math.ceil((power * 512 * base) / (1.5 * 512))
}

export const itemHpCalculation = (maxHp, percentage) => Math.ceil(maxHp * percentage)
export const itemMpCalculation = (maxMp, percentage) => Math.ceil(maxMp * percentage)
