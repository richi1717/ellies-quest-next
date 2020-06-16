import appendToOrder from './appendToOrder'
import { finishTurn, skipTurn } from './setWhoseTurn'
import updateStats, { updateHeroStats } from './updateStats'
import killCharacter from './killCharacter'
import {
  enemiesVar,
  expFromBattleVar,
  heroesVar,
  itemsVar,
  orderVar,
  whoseTurnVar,
  whoShouldRestartTimerVar,
} from '../../cache'
import addEnemies from './addEnemies'
import addHeroes from './addHeroes'
import { addItems, updateItems } from './items'

export const orderMutations = {
  append: appendToOrder(orderVar, whoseTurnVar),
  skipTurn: skipTurn(orderVar, whoseTurnVar),
  finishTurn: finishTurn(orderVar, whoShouldRestartTimerVar, whoseTurnVar),
}

export const characterMutations = {
  addEnemies: addEnemies(enemiesVar),
  addHeroes: addHeroes(heroesVar),
  killCharacter: killCharacter(enemiesVar, heroesVar, orderVar, expFromBattleVar),
  updateHeroStats: updateHeroStats(heroesVar),
  updateStats: updateStats(enemiesVar, heroesVar),
}

export const itemMutations = {
  addItems: addItems(itemsVar),
  updateItems: updateItems(itemsVar),
}
