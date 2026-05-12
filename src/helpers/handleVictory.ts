import { random } from 'lodash'
import type { Hero } from '@/types'
import { calcExpToNextLevel } from './levelCalc'
import { saveHero, saveItem } from '../services/gameData'
import { useBattleStore } from '../store/battleStore'

function buildLevelUpStats() {
  return {
    str: random(5, 10),
    def: random(5, 10),
    maxMp: random(8, 15),
    maxHp: random(80, 140),
    accuracy: random(1, 5),
    magic: random(0, 2),
    evade: random(1, 5),
    agility: random(0, 2),
  }
}

function applyLevelUp(hero: Hero, exp: number): Hero {
  if (hero.killed || calcExpToNextLevel(hero.exp) > exp) return hero
  const gains = buildLevelUpStats()
  const { defending: _, ...rest } = hero
  return {
    ...rest,
    str: hero.str + gains.str,
    def: hero.def + gains.def,
    maxMp: hero.maxMp + gains.maxMp,
    maxHp: hero.maxHp + gains.maxHp,
    accuracy: hero.accuracy + gains.accuracy,
    magic: hero.magic + gains.magic,
    evade: hero.evade + gains.evade,
    agility: hero.agility + gains.agility,
  }
}

export async function handleVictory(heroes: Hero[]): Promise<void> {
  const { expFromBattle, usedItems, setVictory } = useBattleStore.getState()

  await Promise.all(
    heroes
      .filter((h) => h.inPlay)
      .map((hero) => {
        const updated = applyLevelUp(hero, expFromBattle)
        const withExp = hero.killed ? updated : { ...updated, exp: updated.exp + expFromBattle }
        return saveHero(withExp)
      })
  )

  await Promise.all(usedItems.map((item) => saveItem(item)))

  setVictory(true)
}
