import { addExp } from '../../helpers/addExp'
import { enemyKilledFadeOut } from '../../helpers/fadeOut'
import { handleVictory } from '../../helpers/handleVictory'
import { combatDetailsVar, itemsVar } from '../../cache'
import { updateItems } from './items'

function removeCharacterFromOrder (orderVar, found) {
  const order = [...orderVar()]
  const newOrder = order.filter((character) => character?.battleName !== found?.battleName)
  orderVar(newOrder)
}

function checkIfItemDrop (character) {
  if (character?.itemsHeld?.length > 0) {
    const items = itemsVar()
    character.itemsHeld.map((itemHeld) => {
      if (Math.random() < itemHeld.rate * 0.01) {
        const found = items.find((item) => item.name === itemHeld.name)

        if (found) {
          found.amount += 1
          updateItems(itemsVar)(found)
        }
      }
    })
  }
}

export default function killCharacter (enemiesVar, heroesVar, orderVar) {
  return async (character) => {
    combatDetailsVar({})
    const enemies = enemiesVar()
    const heroes = heroesVar()

    const foundEnemy = enemies.findIndex(
      (enemy) => enemy?.battleName === character.battleName
    )

    if (foundEnemy >= 0) {
      checkIfItemDrop(character)
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
