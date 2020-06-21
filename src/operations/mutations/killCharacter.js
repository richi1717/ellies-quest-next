import { addExp } from '../../helpers/addExp'
import { enemyKilledFadeOut } from '../../helpers/fadeOut'
import { handleVictory } from '../../helpers/handleVictory'

function removeCharacterFromOrder (orderVar, found) {
  const order = [...orderVar()]
  const newOrder = order.filter((character) => character?.battleName !== found?.battleName)
  orderVar(newOrder)
}

export default function killCharacter (enemiesVar, heroesVar, orderVar) {
  return async (character) => {
    const enemies = enemiesVar()
    const heroes = heroesVar()

    const foundEnemy = enemies.findIndex(
      (enemy) => enemy?.battleName === character.battleName
    )

    if (foundEnemy >= 0) {
      const enemyEl = document.getElementById(character?.battleName)
      const newEnemies = [...enemies.filter((_, idx) => idx !== foundEnemy)]

      const done = await enemyKilledFadeOut(enemyEl)
      await addExp(character.expOnDefeat)

      enemiesVar(newEnemies)

      if (newEnemies.length === 0) {
        await handleVictory(heroes)
        return done
      }

      removeCharacterFromOrder(orderVar, character)
      return done
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
