import { clone } from 'lodash'
import { characterMutations, orderMutations } from '../../../../operations/mutations'
import {
  damageCalculation,
  magicDamageCalculation,
  magicHealCalculation,
} from '../../../../helpers/damageCalc'
import { getCharacterByBattleName } from '../../../../operations/queries/getCharacters'

function dealDamage (target, targeter) {
  const dmg = damageCalculation(targeter, target)
  target.currentHp -= dmg

  if (target.currentHp <= 0) {
    return characterMutations.killCharacter(target)
  }

  characterMutations.updateStats(target)
  // [TODO] change .defending of hero to false
  // const targetEl = document.getElementById(target.battleName)
  // const targeterEl = document.getElementById(targeter.battleName)

  // console.log(targetEl, targeterEl)
  return orderMutations.finishTurn()
}

function dealMagicDamage (target, targeter) {
  const dmg = magicDamageCalculation(targeter, target)
  target.currentHp -= dmg

  if (target.currentHp <= 0) {
    return characterMutations.killCharacter(target)
  }

  return characterMutations.updateStats(target)
}

function healTarget (target, targeter) {
  const dmg = magicHealCalculation(targeter)
  target.currentHp += dmg
  if (target.maxHp < target.currentHp) {
    target.currentHp = target.maxHp
  }

  return characterMutations.updateStats(target)
}

export function completeAction (battleName, initiator, typeOfAction) {
  // take care of calculating damage here
  // take care of figuring out the type of "damage"
  // if it's heal then add,
  // if it's damage then subtract,
  // if it's revive then see if dead or undead,
  // if it's damage or heal but dead
  const target = clone(getCharacterByBattleName(battleName))
  const targeter = clone(getCharacterByBattleName(initiator))

  if (typeOfAction === 'damage') {
    return dealDamage(target, targeter)
  }

  if (typeOfAction === 'magicDamage') {
    return dealMagicDamage(target, targeter)
  }

  if (typeOfAction === 'heal') {
    return healTarget(target, targeter)
  }
}
