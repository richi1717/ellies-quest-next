import { random } from 'lodash'
import { calcLevel } from './levelCalc'

export const getBaseDamage = (attacker) => {
  const str = attacker.str
  const lvl = attacker.level ? attacker.level : calcLevel(attacker.exp)

  return str + ((str + lvl) / 3.2) * ((str * lvl) / 3.2)
}

export const getBaseMagicDamage = (attacker) => {
  const magic = attacker.magic
  const lvl = attacker.level ? attacker.level : calcLevel(attacker.exp)

  return magic + ((magic + lvl) / 2.8) * ((magic * lvl) / 2.8)
}

export const damageCalculation = (attacker, defender) => {
  const critical = random(1, 100) % 26 === 0
  const power = critical ? random(2.9, 3.3) : random(1.8, 2.7)
  const def = defender.def
  const base = getBaseDamage(attacker)
  let dmg = Math.ceil((power * (512 - def) * base) / (1.6 * 512))
  dmg = dmg > 0 ? dmg : 1

  return dmg
}

export const magicDamageCalculation = (attacker, defender) => {
  const power = random(4.3, 4.6)
  const def = defender.magicDef
  const base = getBaseMagicDamage(attacker)
  let dmg = Math.ceil((power * (512 - def) * base) / (1.5 * 512))
  dmg = dmg > 0 ? dmg : 1

  return dmg
}
