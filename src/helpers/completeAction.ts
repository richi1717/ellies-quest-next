import { clone } from 'lodash'
import type { Character, Item, MagicSpell } from '@/types'
import { useBattleStore } from '../store/battleStore'
import {
  damageCalculation,
  itemHpCalculation,
  itemMpCalculation,
  magicDamageCalculation,
  magicHealCalculation,
} from './damageCalc'

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function actionText(
  typeOfAction: string,
  targeter: Character,
  item?: Item,
  spell?: MagicSpell,
): string {
  if (typeOfAction === 'damage') return targeter.attack || 'Attacks'
  if (item) return `Uses ${item.name}`
  if (spell) return `Casts ${spell.name}`
  return 'Attacks'
}

async function dealDamage(target: Character, targeter: Character) {
  const { setWhoIsReceivingAction, killCharacter, updateStats, finishTurn } =
    useBattleStore.getState()
  const dmg = damageCalculation(targeter, target)
  target.currentHp -= dmg

  if (targeter.battleName.includes('hero')) await sleep(1500)

  setWhoIsReceivingAction({ target: target.battleName, amount: dmg, type: 'damage' })

  if (targeter.battleName.includes('enemy')) await sleep(1500)

  if (target.currentHp <= 0) {
    await killCharacter(target)
  } else {
    await updateStats(target)
  }
  finishTurn()
}

async function dealMagicDamage(target: Character, targeter: Character, spell: MagicSpell) {
  const { setMagicDisplay, setWhoIsReceivingAction, killCharacter, updateStats, finishTurn } =
    useBattleStore.getState()

  setMagicDisplay({ target: target.battleName, type: spell.type })
  await sleep(2000)
  setMagicDisplay(null)

  const dmg = magicDamageCalculation(targeter, target)
  target.currentHp -= dmg
  ;(targeter as Character & { currentMp: number }).currentMp -= spell.cost

  setWhoIsReceivingAction({ target: target.battleName, amount: dmg, type: 'damage' })
  await updateStats(targeter)

  if (target.currentHp <= 0) {
    await killCharacter(target)
  } else {
    await updateStats(target)
  }
  finishTurn()
}

async function dealItemDamage(target: Character, item: Item) {
  const { setWhoIsReceivingAction, killCharacter, updateStats, updateItems, finishTurn } =
    useBattleStore.getState()

  target.currentHp -= item.damage ?? 0
  setWhoIsReceivingAction({ target: target.battleName, amount: item.damage ?? 0, type: 'damage' })

  if (target.currentHp <= 0) {
    await killCharacter(target)
  } else {
    await updateStats(target)
  }

  updateItems({ ...item, amount: item.amount - 1 })
  await sleep(1500)
  finishTurn()
}

async function healTarget(target: Character, targeter: Character, spell?: MagicSpell) {
  const { setMagicDisplay, setWhoIsReceivingAction, updateStats, finishTurn } =
    useBattleStore.getState()

  if (spell) {
    setMagicDisplay({ target: target.battleName, type: spell.type })
    await sleep(2000)
    setMagicDisplay(null)
  }

  const heal = magicHealCalculation(targeter)
  target.currentHp = Math.min(target.currentHp + heal, target.maxHp)

  setWhoIsReceivingAction({ target: target.battleName, amount: heal, type: 'heal' })

  if (spell) {
    ;(targeter as Character & { currentMp: number }).currentMp -= spell.cost
    await updateStats(targeter)
  }

  await updateStats(target)
  finishTurn()
}

async function itemHealTarget(target: Character, item: Item) {
  const { setWhoIsReceivingAction, updateStats, updateItems, finishTurn } =
    useBattleStore.getState()

  item.restore?.forEach((stat) => {
    if (stat === 'HP') {
      const hp = item.percentage
        ? itemHpCalculation(target.maxHp, item.percentage)
        : (item.str ?? 0)
      setWhoIsReceivingAction({ target: target.battleName, amount: hp, type: 'heal' })
      target.currentHp = Math.min(target.currentHp + hp, target.maxHp)
    }
    if (stat === 'MP') {
      const mp = item.percentage
        ? itemMpCalculation(target.maxMp, item.percentage)
        : (item.str ?? 0)
      setWhoIsReceivingAction({ target: target.battleName, amount: mp, type: 'heal' })
      target.currentMp = Math.min(target.currentMp + mp, target.maxMp)
    }
  })

  updateItems({ ...item, amount: item.amount - 1 })
  await updateStats(target)
  await sleep(1500)
  finishTurn()
}

async function reviveTarget(target: Character, targeter: Character, spell?: MagicSpell) {
  target.killed = false
  return healTarget(target, targeter, spell)
}

async function itemReviveTarget(target: Character, item: Item) {
  const { setWhoIsReceivingAction, updateStats, updateItems, finishTurn } =
    useBattleStore.getState()

  target.killed = false
  const hp = itemHpCalculation(target.maxHp, item.revive ?? 0)
  target.currentHp += hp

  setWhoIsReceivingAction({ target: target.battleName, amount: hp, type: 'heal' })
  updateItems({ ...item, amount: item.amount - 1 })
  await updateStats(target)
  await sleep(1500)
  finishTurn()
}

export default async function completeAction(
  battleName: string,
  initiator: Character,
  typeOfAction: string,
  spell?: MagicSpell,
  item?: Item,
) {
  const { getCharacterByBattleName, setCombatDetails } = useBattleStore.getState()

  const _target = clone(getCharacterByBattleName(battleName))
  const _targeter = clone(initiator)

  if (!_target || !_targeter) return

  setCombatDetails({
    target: _target,
    targeter: _targeter,
    text: actionText(typeOfAction, _targeter, item, spell),
    type: typeOfAction as never,
  })

  const target = { ..._target }
  const targeter = { ..._targeter }

  switch (typeOfAction) {
    case 'damage':
      return dealDamage(target, targeter)
    case 'itemDamage':
      return dealItemDamage(target, item!)
    case 'magicDamage':
      return dealMagicDamage(target, targeter, spell!)
    case 'heal':
      return item ? itemHealTarget(target, item) : healTarget(target, targeter, spell)
    case 'revive':
      return item ? itemReviveTarget(target, item) : reviveTarget(target, targeter, spell)
    default:
      return dealDamage(target, targeter)
  }
}
