import clone from 'lodash/fp/clone'
import { damageCalculation, magicDamageCalculation } from '../helpers/damageCalc'
import {
  endHeroTurn,
  setAttackerAndTarget,
  updateCharacterStats,
} from '../actions/actionCreators'

export default function useAttack (deets) {
  const dispatch = 'what?'
  const { enemyStats, characterStats, whoIsAttacking, magicType } = deets

  const completePhase = (enemy, id) => {
    setTimeout(() => {
      dispatch(endHeroTurn({ enemy, id }))
    }, 1500)
  }

  const magicCompletePhase = (enemy, id, character, characterId) => {
    dispatch(
      updateCharacterStats({
        character,
        id: characterId,
      })
    )
    completePhase(enemy, id)
  }

  const enemyKilledFadeOut = (element) => {
    element.style.opacity = 1
    element.style.display = 'block'

    const fade = () => {
      let val = parseFloat(element.style.opacity)

      if (!(val - 0.01 < 0)) {
        val -= 0.01
        element.style.opacity = val
        window.requestAnimationFrame(fade)
      }
    }

    fade()
  }

  const attackEnemy = (target, enemy, attacker, index, isMagic) => {
    const enemyCopy = clone(enemy)
    const heroId = attacker.split('hero')[1] - 1
    const hero = clone(characterStats[heroId])
    if (isMagic) {
      hero.currentMp -= magicType.cost
    }
    const dmg = isMagic
      ? magicDamageCalculation(hero, enemyCopy)
      : damageCalculation(hero, enemyCopy)
    const killed = dmg >= enemyCopy.currentHp
    enemyCopy.currentHp -= dmg

    dispatch(
      setAttackerAndTarget({
        attacker,
        target,
        typeOfAttack: whoIsAttacking.typeOfAttack,
      })
    )

    if (killed) {
      enemyCopy.currentHp = 0
      enemyCopy.killed = killed
      const element = document.getElementById(enemyCopy.attackerId)

      enemyKilledFadeOut(element)
    }

    isMagic
      ? magicCompletePhase(enemyCopy, index, hero, heroId)
      : completePhase(enemyCopy, index)
  }

  const attack = (target) => {
    const index = target.split('enemy')[1] - 1
    const defender = enemyStats[index]
    const { attacker } = whoIsAttacking

    attackEnemy(target, defender, attacker, index)
  }

  const magicAttack = (target) => {
    const index = target.split('enemy')[1] - 1
    const defender = enemyStats[index]
    const { attacker } = whoIsAttacking

    attackEnemy(target, defender, attacker, index, true)
  }

  return { attack, magicAttack }
}
