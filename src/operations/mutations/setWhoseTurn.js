import { isEmpty } from 'lodash'

export default function setWhoseTurn (orderVar, whoseTurnVar) {
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
