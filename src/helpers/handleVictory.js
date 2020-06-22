import fetch from 'unfetch'
import { random } from 'lodash'
import { expFromBattleVar, usedItemsVar, victoryVar } from '../cache'
import { calcExpToNextLevel } from './levelCalc'

function checkHeroForLevel (hero, exp) {
  if (!hero.killed && calcExpToNextLevel(hero.exp) <= exp) {
    const updatedStats = {
      str: random(5, 10),
      def: random(5, 10),
      maxMp: random(8, 15),
      maxHp: random(80, 140),
      accuracy: random(1, 5),
      magic: random(0, 2),
      evade: random(1, 5),
      agility: random(0, 2),
    }

    const { defending, ...rest } = hero

    const updated = {
      ...rest,
      str: hero.str + updatedStats.str,
      def: hero.def + updatedStats.def,
      maxMp: hero.maxMp + updatedStats.maxMp,
      maxHp: hero.maxHp + updatedStats.maxHp,
      accuracy: hero.accuracy + updatedStats.accuracy,
      magic: hero.magic + updatedStats.magic,
      evade: hero.evade + updatedStats.evade,
      agility: hero.agility + updatedStats.agility,
    }

    return Promise.resolve(updated)
  }
  return Promise.resolve(hero)
}

function updateCharacters (heroes) {
  const exp = expFromBattleVar()
  heroes.map(async (hero) => {
    if (hero.inPlay) {
      const updatedHero = { ...(await checkHeroForLevel(hero, exp)) }

      if (!hero.killed) {
        updatedHero.exp += exp
      }

      await fetch(`${process.env.appUrl}/api/updateCharacters`, {
        method: 'POST',
        body: JSON.stringify({
          id: hero?.id,
          characterData: updatedHero,
        }),
      })
    }
  })

  return new Promise((resolve) => resolve('done'))
}

function updateItems () {
  const items = usedItemsVar()
  items.map(async (item) => {
    await fetch(`${process.env.appUrl}/api/updateItems`, {
      method: 'POST',
      body: JSON.stringify({
        id: item?.id,
        item: { amount: item.amount },
      }),
    })
  })

  return new Promise((resolve) => resolve('done'))
}

export async function handleVictory (heroes) {
  await updateCharacters(heroes)
  await updateItems()
  victoryVar(true)

  return new Promise((resolve) => resolve('done'))
}
