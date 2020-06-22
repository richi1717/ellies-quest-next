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
import { combatDetailsVar, magicDisplayVar, whoIsReceivingActionVar } from '../cache'

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

async function dealDamage (target, targeter) {
  const dmg = damageCalculation(targeter, target)
  target.currentHp -= dmg

  if (targeter.battleName.includes('hero')) {
    await sleep(1500)
  }

  whoIsReceivingActionVar({ target: target?.battleName, amount: dmg, type: 'damage' })

  if (targeter.battleName.includes('enemy')) {
    await sleep(1500)
  }

  console.log('%cdamage: ' + dmg, 'color: orange', { target, targeter })
  console.log('%cEnemy Health: ' + target.currentHp, 'color: green')

  if (target.currentHp <= 0) {
    await characterMutations.killCharacter(target)
  } else {
    await characterMutations.updateStats(target)
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
    whoIsReceivingActionVar({ target: target?.battleName, amount: dmg, type: 'damage' })
    await characterMutations.updateStats(targeter)

    if (target.currentHp <= 0) {
      await characterMutations.killCharacter(target)
    } else {
      await characterMutations.updateStats(target)
    }

    return orderMutations.finishTurn()
  }, 2000)
}

async function dealItemDamage (target, item) {
  target.currentHp -= item.damage
  whoIsReceivingActionVar({
    target: target?.battleName,
    amount: item.damage,
    type: 'damage',
  })

  if (target.currentHp <= 0) {
    characterMutations.killCharacter(target)
  } else {
    await characterMutations.updateStats(target)
  }

  const clonedItem = clone(item)
  clonedItem.amount -= 1
  itemMutations.updateItems(clonedItem)

  await sleep(1500)

  return orderMutations.finishTurn()
}

async function healTarget (target, targeter, typeOfMagic) {
  magicDisplayVar({ target: target.battleName, type: typeOfMagic?.type })

  await setTimeout(async () => {
    magicDisplayVar({})
    const dmg = magicHealCalculation(targeter)
    target.currentHp += dmg
    whoIsReceivingActionVar({ target: target?.battleName, amount: dmg, type: 'heal' })
    if (target.maxHp < target.currentHp) {
      target.currentHp = target.maxHp
    }

    if (typeOfMagic) {
      targeter.currentMp -= typeOfMagic.cost
      await characterMutations.updateStats(targeter)
    }

    await characterMutations.updateStats(target)
    return orderMutations.finishTurn()
  }, 2000)
}

async function itemHealTarget (target, item) {
  item.restore.map((statToRestore) => {
    if (statToRestore === 'HP') {
      let hp = item.str
      if (item.percentage) {
        hp = itemHpCalculation(target.maxHp, item.percentage)
      }
      whoIsReceivingActionVar({ target: target?.battleName, amount: hp, type: 'heal' })
      target.currentHp += hp
      return target
    }
    if (statToRestore === 'MP') {
      let mp = item.str
      if (item.percentage) {
        mp = itemMpCalculation(target.maxHp, item.percentage)
      }
      whoIsReceivingActionVar({ target: target?.battleName, amount: mp, type: 'heal' })
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
  await characterMutations.updateStats(target)

  await sleep(1500)

  return orderMutations.finishTurn()
}

function reviveTarget (target, targeter, typeOfMagic) {
  target.killed = false
  return healTarget(target, targeter, typeOfMagic)
}

async function itemReviveTarget (target, item) {
  target.killed = false
  const hp = itemHpCalculation(target.maxHp, item.revive)
  target.currentHp += hp
  whoIsReceivingActionVar({ target: target?.battleName, amount: hp, type: 'heal' })
  const clonedItem = clone(item)
  clonedItem.amount -= 1
  itemMutations.updateItems(clonedItem)
  await characterMutations.updateStats(target)

  await sleep(1500)

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
  const _target = clone(getCharacterByBattleName(battleName))
  const _targeter = clone(initiator)

  const text = () => {
    if (typeOfAction === 'damage') return _targeter.attack || 'Attacks'
    if (item) return `Uses ${item.name}`
    if (typeOfMagic) return `Casts ${typeOfMagic.name}`
  }

  combatDetailsVar({
    target: _target,
    targeter: _targeter,
    text: text(),
    type: typeOfAction,
  })

  const target = { ..._target }
  const targeter = { ..._targeter }

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
