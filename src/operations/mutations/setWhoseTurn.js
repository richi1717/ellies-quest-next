import { isEmpty } from 'lodash'
import { characterMutations } from '.'
import { getCharacterByBattleName } from '../queries/getCharacters'

function resetDefending (character, heroesVar) {
  if (character?.battleName.includes('hero')) {
    const hero = getCharacterByBattleName(character.battleName)
    delete hero.defending
    characterMutations.updateStats(hero)
  }
}

export function skipTurn (orderVar, whoseTurnVar) {
  return () => {
    const turn = whoseTurnVar()
    const order = orderVar()
    const whoseTurn = order.shift()
    const newOrder = [...order]

    if (!isEmpty(turn)) {
      newOrder.push(turn)
    }

    resetDefending(whoseTurn)

    orderVar(newOrder)
    whoseTurnVar(whoseTurn)
  }
}

export function finishTurn (orderVar, whoShouldRestartTimerVar, whoseTurnVar) {
  return () => {
    const endersTurn = whoseTurnVar()
    const order = orderVar()
    const whoseTurn = order.shift()
    const newOrder = [...order]

    resetDefending(whoseTurn)

    orderVar(newOrder)
    whoseTurnVar(whoseTurn)
    whoShouldRestartTimerVar(endersTurn?.battleName)
  }
}
