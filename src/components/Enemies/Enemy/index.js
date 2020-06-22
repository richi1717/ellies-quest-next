import { random } from 'lodash'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { EnemyDisplayStyled, TurnStyled } from './styled'
import { GET_HEROES } from '../../../operations/queries/getCharacters'
import { GET_MAGIC_DISPLAY } from '../../../operations/queries/getMagicDisplay'
import { GET_WHO_IS_RECEIVING_ACTION } from '../../../operations/queries/getWhoIsReceivingAction'
import { GET_WHOSE_TURN } from '../../../operations/queries/getWhoseTurn'
import { orderMutations } from '../../../operations/mutations'
import { useDelayedEffect, useSoundFX, useTimer } from '../../../hooks'
import { whoIsReceivingActionVar } from '../../../cache'
import completeAction from '../../../helpers/completeAction'
import CountDownTimer from '../../../helpers/CountDownTimer'
import DamageDisplay from '../../DamageDisplay'
import MagicDisplay from '../../MagicDisplay'

const Enemy = ({ enemy, position }) => {
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const magicDisplayQuery = useQuery(GET_MAGIC_DISPLAY)
  const heroesQuery = useQuery(GET_HEROES)
  const whoIsReceivingActionQuery = useQuery(GET_WHO_IS_RECEIVING_ACTION)
  const [target, setTarget] = useState('')
  const { play } = useSoundFX('enemyAttackFX')
  const battleName = `enemy${position}`
  const heroes = heroesQuery?.data?.heroes
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  const magicDisplay = magicDisplayQuery?.data?.magicDisplay
  const whoIsReceivingAction = whoIsReceivingActionQuery?.data?.whoIsReceivingAction
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
      if (whoIsReceivingAction?.target === battleName) {
        whoIsReceivingActionVar({})
      }
    },
    2000,
    [whoIsReceivingAction?.target]
  )

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
        play()
        completeAction(target?.battleName, enemy, 'damage')
      }
    },
    1500,
    [target]
  )

  return (
    <div>
      <EnemyDisplayStyled
        classes={enemy.classes}
        id={battleName}
        target={target?.battleName}
      >
        {magicDisplay?.target === battleName && <MagicDisplay type={magicDisplay?.type} />}
        {/* This is just to show that the damage update is working */}
        {whoIsReceivingAction?.target === battleName && (
          <DamageDisplay
            amount={whoIsReceivingAction?.amount}
            isDamage={whoIsReceivingAction?.type === 'damage'}
            battleName={battleName}
          />
        )}
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
