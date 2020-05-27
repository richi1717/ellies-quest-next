function removeCharacterFromOrder (orderVar, found) {
  const order = [...orderVar()]
  const newOrder = order.filter((character) => character?.battleName !== found?.battleName)
  return orderVar(newOrder)
}

export default function killCharacter (enemiesVar, heroesVar, orderVar) {
  return (character) => {
    const enemies = enemiesVar()
    const heroes = heroesVar()

    const foundEnemy = enemies.findIndex(
      (enemy) => enemy?.battleName === character.battleName
    )

    if (foundEnemy >= 0) {
      const newEnemies = [...enemies.filter((_, idx) => idx !== foundEnemy)]

      enemiesVar(newEnemies)
      return removeCharacterFromOrder(orderVar, character)
    }

    const foundHero = heroes.findIndex(
      ({ battleName }) => battleName === character.battleName
    )

    if (foundHero >= 0) {
      const newHeroes = [...heroes]
      character.killed = true
      character.currentHp = 0
      newHeroes[foundHero] = character
      heroesVar(newHeroes)
      return removeCharacterFromOrder(orderVar, character)
    }
  }
}
