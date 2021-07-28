import { isEmpty } from 'lodash'

export default function appendToOrder (orderVar, whoseTurnVar) {
  return (character) => {
    const order = orderVar()

    if (order.length === 0 && isEmpty(whoseTurnVar())) {
      whoseTurnVar(character)
    } else {
      !order.some((obj) => obj.battleName === character.battleName) &&
        orderVar(order.concat(character))
    }
  }
}
