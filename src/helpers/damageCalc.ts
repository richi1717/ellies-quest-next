import { random } from 'lodash'
import type { Character } from '@/types'
import { calcLevel } from './levelCalc'

export function getBaseDamage(targeter: Character): number {
  const lvl = calcLevel(targeter.exp) || 1
  return (
    targeter.str +
    ((targeter.str + lvl) / 3.2) * ((targeter.str * lvl) / 3.2)
  )
}

export function getBaseMagicDamage(targeter: Character): number {
  const lvl = calcLevel(targeter.exp)
  return (
    targeter.magic +
    ((targeter.magic + lvl) / 2.8) * ((targeter.magic * lvl) / 2.8)
  )
}

export function damageCalculation(targeter: Character, target: Character): number {
  const critical = random(1, 100) % 26 === 0
  const power = critical ? random(3.1, 3.6) : random(1.9, 2.5)
  const base = getBaseDamage(targeter)
  let dmg = Math.ceil((power * (512 - target.def) * base) / (1.6 * 512))

  if ('defending' in target && target.defending) dmg = Math.ceil(dmg / 2)
  dmg = Math.max(1, dmg)
  dmg = Math.min(dmg, target.currentHp)

  return dmg
}

export function magicDamageCalculation(targeter: Character, target: Character): number {
  const power = random(4.3, 4.6)
  const base = getBaseMagicDamage(targeter)
  let dmg = Math.ceil((power * (512 - target.magicDef) * base) / (1.5 * 512))
  dmg = Math.max(1, dmg)
  dmg = Math.min(dmg, target.currentHp)
  return dmg
}

export function magicHealCalculation(targeter: Character): number {
  const power = random(2.0, 2.4)
  const base = getBaseMagicDamage(targeter)
  return Math.ceil((power * 512 * base) / (1.5 * 512))
}

export function itemHpCalculation(maxHp: number, percentage: number): number {
  return Math.ceil(maxHp * percentage)
}

export function itemMpCalculation(maxMp: number, percentage: number): number {
  return Math.ceil(maxMp * percentage)
}
