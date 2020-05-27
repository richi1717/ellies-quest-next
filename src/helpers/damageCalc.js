import { random } from 'lodash'
import { calcLevel } from './levelCalc'

export const getBaseDamage = (attacker) => {
  const str = attacker.str
  const lvl = calcLevel(attacker.exp)

  return str + ((str + lvl) / 3.2) * ((str * lvl) / 3.2)
}

export const getBaseMagicDamage = (attacker) => {
  const magic = attacker.magic
  const lvl = calcLevel(attacker.exp)

  return magic + ((magic + lvl) / 2.8) * ((magic * lvl) / 2.8)
}

export const damageCalculation = (attacker, defender) => {
  const critical = random(1, 100) % 26 === 0
  const power = critical ? random(3.1, 3.6) : random(1.9, 2.5)
  const def = defender.def
  const base = getBaseDamage(attacker)
  let dmg = Math.ceil((power * (512 - def) * base) / (1.6 * 512))

  if (defender.defending) {
    dmg = dmg / 2
  }

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

export const magicHealCalculation = (targeter) => {
  const power = random(2.0, 2.4)
  const base = getBaseMagicDamage(targeter)
  return Math.ceil((power * 512 * base) / (1.5 * 512))
}
