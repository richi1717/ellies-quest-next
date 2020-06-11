import { random } from 'lodash'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { enemyAttackFX } from '../../../helpers/soundEffects'
import { EnemyDisplayStyled, TurnStyled } from './styled'
import { GET_HEROES } from '../../../operations/queries/getCharacters'
import { GET_WHOSE_TURN } from '../../../operations/queries/getWhoseTurn'
import { orderMutations } from '../../../operations/mutations'
import { useDelayedEffect, useTimer } from '../../../hooks'
import completeAction from '../../../helpers/completeAction'
import CountDownTimer from '../../../helpers/CountDownTimer'
import MagicAttacks from '../../MagicAttacks'

const Enemy = ({ enemy, position }) => {
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const heroesQuery = useQuery(GET_HEROES)
  const [target, setTarget] = useState('')
  const battleName = `enemy${position}`
  const heroes = heroesQuery?.data?.heroes
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  const attacking = whoseTurn?.battleName === battleName

  const timer = new CountDownTimer(100, 50)

  function handleTick () {
    return function (seconds) {
      const percentage = 100 - seconds

      if (percentage === 100) {
        orderMutations.append(enemy)
      }
    }
  }

  useTimer(timer, enemy, handleTick)

  useDelayedEffect(
    () => {
      if (attacking) {
        const filtered = heroes.filter((hero) => {
          return !hero.killed
        })
        const selected = filtered[random(1, filtered.length) - 1]

        setTarget(selected)
      }
    },
    1000,
    [attacking]
  )

  useDelayedEffect(
    () => {
      if (target) {
        setTarget('')
        enemyAttackFX()
        setTimeout(() => completeAction(target?.battleName, enemy, 'damage'), 1500)
      }
    },
    1500,
    [target]
  )

  // simulate magic selection, add magicAttack state change which includes type and target
  const magicAttack = {
    type: 'lightning',
    target: 'enemy1',
  }

  return (
    <div>
      <EnemyDisplayStyled
        classes={enemy.classes}
        id={battleName}
        target={target?.battleName}
      >
        {magicAttack?.target === battleName && <MagicAttacks magicAttack={magicAttack} />}
        {/* This is just to show that the damage update is working */}
        <div style={{ position: 'absolute', color: 'red' }}>{enemy.currentHp}</div>
        {attacking && <TurnStyled />}
      </EnemyDisplayStyled>
      {/* {showDamageOverHead()} */}
    </div>
  )
}

Enemy.propTypes = {
  position: PropTypes.number.isRequired,
  enemy: PropTypes.object.isRequired,
}

export default Enemy
