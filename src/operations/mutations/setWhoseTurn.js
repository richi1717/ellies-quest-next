import { isEmpty } from 'lodash'

export function skipTurn (orderVar, whoseTurnVar) {
  return () => {
    const turn = whoseTurnVar()
    const order = orderVar()
    const whoseTurn = order.shift()
    const newOrder = [...order]

    if (!isEmpty(turn)) {
      newOrder.push(turn)
    }

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

    orderVar(newOrder)
    whoseTurnVar(whoseTurn)
    whoShouldRestartTimerVar(endersTurn?.battleName)
  }
}
