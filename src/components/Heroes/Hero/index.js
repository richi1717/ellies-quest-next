import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { GET_COMBAT_DETAILS } from '../../../operations/queries/getCombatDetails'
import { GET_MAGIC_DISPLAY } from '../../../operations/queries/getMagicDisplay'
import { GET_WHO_IS_RECEIVING_ACTION } from '../../../operations/queries/getWhoIsReceivingAction'
import { GET_WHOSE_TURN } from '../../../operations/queries/getWhoseTurn'
import { HeroStyled, TurnStyled } from './styled'
import { useDelayedEffect, useSoundFX, useTimer } from '../../../hooks'
import { whoIsReceivingActionVar } from '../../../cache'
import DamageDisplay from '../../DamageDisplay'
import MagicDisplay from '../../MagicDisplay'
import { characterMutations, orderMutations } from '../../../operations/mutations'
import CountDownTimer from '../../../helpers/CountDownTimer'

const Hero = ({ hero, position }) => {
  const { battleName, classes, defending, killed } = hero
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const magicDisplayQuery = useQuery(GET_MAGIC_DISPLAY)
  const whoIsReceivingActionQuery = useQuery(GET_WHO_IS_RECEIVING_ACTION)
  const combatDetailsQuery = useQuery(GET_COMBAT_DETAILS)
  const magicDisplay = magicDisplayQuery?.data?.magicDisplay
  const whoIsReceivingAction = whoIsReceivingActionQuery?.data?.whoIsReceivingAction
  const combatDetails = combatDetailsQuery?.data?.combatDetails
  const isAttacking =
    combatDetails?.type === 'damage' && combatDetails?.targeter?.battleName === battleName
  const { play } = useSoundFX('heroAttackFX')

  const timer = new CountDownTimer(100, 50)

  function handleTick () {
    return function (seconds) {
      const percentage = 100 - seconds

      if (percentage === 100) {
        orderMutations.append(hero)
      }
    }
  }

  useTimer(timer, hero, handleTick)

  useDelayedEffect(
    () => {
      if (isAttacking) {
        play()
      }
    },
    1000,
    [isAttacking]
  )

  useDelayedEffect(
    () => {
      if (whoIsReceivingAction?.target === battleName) {
        whoIsReceivingActionVar({})
      }
    },
    2000,
    [whoIsReceivingAction?.target]
  )
  // simulate loading into the queue
  useDelayedEffect(
    () => {
      if (isEmpty(whoseTurn)) {
        orderMutations.append(hero)
      }
    },
    100 - hero?.agility,
    []
  )

  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  const attacking = whoseTurn?.battleName === battleName
  const attackPosition = isAttacking && combatDetails?.target?.battleName

  const heroInfo = {
    attackerId: battleName,
    attacking,
    attackPosition,
    defending,
    killed,
    name: classes,
    position,
  }

  return (
    <HeroStyled id={battleName} {...heroInfo}>
      {attacking && <TurnStyled />}
      {whoIsReceivingAction?.target === battleName && (
        <DamageDisplay
          amount={whoIsReceivingAction?.amount}
          isDamage={whoIsReceivingAction?.type === 'damage'}
          battleName={battleName}
        />
      )}
      {magicDisplay?.target === battleName && <MagicDisplay type={magicDisplay?.type} />}
    </HeroStyled>
  )
}

Hero.propTypes = {
  position: PropTypes.number.isRequired,
  hero: PropTypes.shape({
    battleName: PropTypes.string.isRequired,
    classes: PropTypes.string.isRequired,
    defending: PropTypes.bool,
    killed: PropTypes.bool.isRequired,
  }).isRequired,
}

export default Hero
