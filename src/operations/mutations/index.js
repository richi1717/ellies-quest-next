import addCharacters from './addCharacters'
import appendToOrder from './appendToOrder'
import setWhoseTurn from './setWhoseTurn'
import updateStats from './updateStats'
import { charactersVar, enemiesVar, heroesVar, orderVar, whoseTurnVar } from '../../cache'
import addEnemies from './addEnemies'
import addHeroes from './addHeroes'

export const orderMutations = {
  append: appendToOrder(orderVar, whoseTurnVar),
  setWhoseTurn: setWhoseTurn(orderVar, whoseTurnVar),
}

export const characterMutations = {
  addCharacters: addCharacters(charactersVar),
  addEnemies: addEnemies(enemiesVar),
  addHeroes: addHeroes(heroesVar),
  updateStats: updateStats(charactersVar),
}
