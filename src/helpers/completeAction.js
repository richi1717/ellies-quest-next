import { clone } from 'lodash'
import { characterMutations, itemMutations, orderMutations } from '../operations/mutations'
import {
  damageCalculation,
  itemHpCalculation,
  itemMpCalculation,
  magicDamageCalculation,
  magicHealCalculation,
} from './damageCalc'
import { getCharacterByBattleName } from '../operations/queries/getCharacters'
import { magicDisplayVar } from '../cache'

async function dealDamage (target, targeter) {
  const dmg = damageCalculation(targeter, target)
  target.currentHp -= dmg

  console.log('%cdamage: ' + dmg, 'color: orange', { target, targeter })
  console.log('%cEnemy Health: ' + target.currentHp, 'color: green')

  if (target.currentHp <= 0) {
    await characterMutations.killCharacter(target)
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
async function dealMagicDamage (target, targeter, typeOfMagic) {
  magicDisplayVar({ target: target.battleName, type: typeOfMagic.type })
  await setTimeout(async () => {
    magicDisplayVar({})
    const dmg = magicDamageCalculation(targeter, target)
    target.currentHp -= dmg
    targeter.currentMp -= typeOfMagic.cost

    if (target.currentHp <= 0) {
      await characterMutations.killCharacter(target)
    } else {
      characterMutations.updateStats(targeter)
      characterMutations.updateStats(target)
    }

    return orderMutations.finishTurn()
  }, 2000)
}

function dealItemDamage (target, item) {
  target.currentHp -= item.damage

  if (target.currentHp <= 0) {
    characterMutations.killCharacter(target)
  } else {
    characterMutations.updateStats(target)
  }

  if (item) {
    const clonedItem = clone(item)
    clonedItem.amount -= 1
    itemMutations.updateItems(clonedItem)
  }

  return orderMutations.finishTurn()
}

function healTarget (target, targeter, typeOfMagic) {
  magicDisplayVar({ target: target.battleName, type: typeOfMagic?.type })

  setTimeout(() => {
    magicDisplayVar({})
    const dmg = magicHealCalculation(targeter)
    target.currentHp += dmg

    if (target.maxHp < target.currentHp) {
      target.currentHp = target.maxHp
    }

    if (typeOfMagic) {
      targeter.currentMp -= typeOfMagic.cost
      characterMutations.updateStats(targeter)
    }

    characterMutations.updateStats(target)
    return orderMutations.finishTurn()
  }, 2000)
}

function itemHealTarget (target, item) {
  item.restore.map((statToRestore) => {
    if (statToRestore === 'HP') {
      let hp = item.str
      if (item.percentage) {
        hp = itemHpCalculation(target.maxHp, item.percentage)
      }
      target.currentHp += hp
      return target
    }
    if (statToRestore === 'MP') {
      let mp = item.str
      if (item.percentage) {
        mp = itemMpCalculation(target.maxHp, item.percentage)
      }
      target.currentMp += mp
      return target
    }
  })
  if (target.maxHp < target.currentHp) {
    target.currentHp = target.maxHp
  }

  if (target.maxMp < target.currentMp) {
    target.currentMp = target.maxMp
  }

  const clonedItem = clone(item)
  clonedItem.amount -= 1
  itemMutations.updateItems(clonedItem)
  characterMutations.updateStats(target)
  return orderMutations.finishTurn()
}

function reviveTarget (target, targeter, typeOfMagic) {
  target.killed = false
  return healTarget(target, targeter, typeOfMagic)
}

function itemReviveTarget (target, item) {
  target.killed = false
  target.currentHp += itemHpCalculation(target.maxHp, item.revive)

  const clonedItem = clone(item)
  clonedItem.amount -= 1
  itemMutations.updateItems(clonedItem)
  characterMutations.updateStats(target)
  return orderMutations.finishTurn()
}

export default function (battleName, initiator, typeOfAction, typeOfMagic, item) {
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
    case 'itemDamage':
      return dealItemDamage(target, item)
    case 'magicDamage':
      return dealMagicDamage(target, targeter, typeOfMagic)
    case 'heal': {
      if (item) {
        return itemHealTarget(target, item)
      }
      return healTarget(target, targeter, typeOfMagic)
    }
    case 'revive': {
      if (item) {
        return itemReviveTarget(target, item)
      }
      return reviveTarget(target, targeter, typeOfMagic)
    }
    default:
      return dealDamage(target, targeter)
  }
}
