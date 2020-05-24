import addCharacters from './addCharacters'
import appendToOrder from './appendToOrder'
import { finishTurn, skipTurn } from './setWhoseTurn'
import updateStats from './updateStats'
import {
  charactersVar,
  enemiesVar,
  heroesVar,
  orderVar,
  whoseTurnVar,
  whoShouldRestartTimerVar,
} from '../../cache'
import addEnemies from './addEnemies'
import addHeroes from './addHeroes'

export const orderMutations = {
  append: appendToOrder(orderVar, whoseTurnVar),
  skipTurn: skipTurn(orderVar, whoseTurnVar),
  finishTurn: finishTurn(orderVar, whoShouldRestartTimerVar, whoseTurnVar),
}

export const characterMutations = {
  addCharacters: addCharacters(charactersVar),
  addEnemies: addEnemies(enemiesVar),
  addHeroes: addHeroes(heroesVar),
  updateStats: updateStats(charactersVar),
}
