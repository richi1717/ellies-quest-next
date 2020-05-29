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
    characterMutations.killCharacter(target)
  } else {
    characterMutations.updateStats(target)
  }
  // [TODO] change .defending of hero to false
  // const targetEl = document.getElementById(target.battleName)
  // const targeterEl = document.getElementById(targeter.battleName)

  // console.log(targetEl, targeterEl)
  return orderMutations.finishTurn()
}

// [TODO} adding typeOfMagic to args for later calculating element resistance and vulnerabilities
function dealMagicDamage (target, targeter, typeOfMagic) {
  const dmg = magicDamageCalculation(targeter, target)
  target.currentHp -= dmg
  targeter.currentMp -= typeOfMagic.cost

  if (target.currentHp <= 0) {
    characterMutations.killCharacter(target)
  } else {
    characterMutations.updateStats(targeter)
    characterMutations.updateStats(target)
  }
  return orderMutations.finishTurn()
}

function healTarget (target, targeter, typeOfMagic) {
  const dmg = magicHealCalculation(targeter)
  target.currentHp += dmg
  targeter.currentMp -= typeOfMagic.cost

  if (target.maxHp < target.currentHp) {
    target.currentHp = target.maxHp
  }

  characterMutations.updateStats(targeter)
  characterMutations.updateStats(target)
  return orderMutations.finishTurn()
}

export function completeAction (battleName, initiator, typeOfAction, typeOfMagic) {
  // console.log(typeOfMagic, typeOfAction)
  // take care of calculating damage here
  // take care of figuring out the type of "damage"
  // if it's heal then add,
  // if it's damage then subtract,
  // if it's revive then see if dead or undead,
  // if it's damage or heal but dead
  const target = clone(getCharacterByBattleName(battleName))
  const targeter = clone(initiator)

  switch (typeOfAction) {
    case 'damage':
      return dealDamage(target, targeter)
    case 'magicDamage':
      return dealMagicDamage(target, targeter, typeOfMagic)
    case 'heal':
      return healTarget(target, targeter, typeOfMagic)
    default:
      return dealDamage(target, targeter)
  }
}
