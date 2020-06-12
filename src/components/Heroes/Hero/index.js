// import classnames from 'classnames'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useState } from 'react'
import { GET_MAGIC_DISPLAY } from '../../../operations/queries/getMagicDisplay'
import { GET_WHOSE_TURN } from '../../../operations/queries/getWhoseTurn'
import { GET_WHO_IS_RECEIVING_ACTION } from '../../../operations/queries/getWhoIsReceivingAction'
import { getCharacterByBattleName } from '../../../operations/queries/getCharacters'
import { HeroStyled, TurnStyled } from './styled'
import DamageDisplay from '../../DamageDisplay'
import MagicDisplay from '../../MagicDisplay'
import { useDelayedEffect } from '../../../hooks'
import { whoIsReceivingActionVar } from '../../../cache'

const Hero = ({ hero, position }) => {
  // console.log({ hero })
  const { battleName, killed } = hero
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const magicDisplayQuery = useQuery(GET_MAGIC_DISPLAY)
  const whoIsReceivingActionQuery = useQuery(GET_WHO_IS_RECEIVING_ACTION)
  const magicDisplay = magicDisplayQuery?.data?.magicDisplay
  const whoIsReceivingAction = whoIsReceivingActionQuery?.data?.whoIsReceivingAction

  useDelayedEffect(
    () => {
      if (whoIsReceivingAction?.target === battleName) {
        whoIsReceivingActionVar({})
      }
    },
    2000,
    [whoIsReceivingAction?.target]
  )

  const { magicType } = 'attack' // ????
  const [pos2, setPos2] = useState(false)
  // console.log('update', props);

  const setHeroAttackingAnimation = () => {
    setTimeout(() => {
      heroAttackFX()
    }, 800)
  }

  const setHeroMAgicAttackingAnimation = () => {
    setTimeout(() => {
      if (magicType) {
        const type = magicType.name.slice(0, -1).toLowerCase()
        const matchTypeToSound = {
          fire: () => fireMagicFX(),
          lightning: () => lightningMagicFX(),
          cure: () => cureMagicFX(),
        }
        matchTypeToSound[type]()
      }
    }, 800)
  }

  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  const attacking = whoseTurn?.battleName === battleName
  const heroInfo = {
    position,
    killed,
    defending: hero.defending,
    attackerId: battleName,
    attacking,
    name: hero.classes,
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

// const shouldNotUpdate = (prevProps, nextProps) => {
//   if (nextProps.isHeroDeadAndNotBeingRevived) return true
//   console.log(prevProps.attackerId, nextProps.attackerId)
//   const { attackerId: prevId, whoseTurn: prevWho } = prevProps
//   const { attackerId: id, whoseTurn: who } = nextProps
//   const isAttacker = id === who.attacker || prevId === prevWho.attacker

//   return !isAttacker || isEqual(prevProps, nextProps)
// }

Hero.propTypes = {
  position: PropTypes.number.isRequired,
  hero: PropTypes.shape({
    accuracy: PropTypes.number.isRequired,
    agility: PropTypes.number.isRequired,
    battleName: PropTypes.string.isRequired,
    classes: PropTypes.string.isRequired,
    currentHp: PropTypes.number.isRequired,
    currentMp: PropTypes.number.isRequired,
    def: PropTypes.number.isRequired,
    defending: PropTypes.bool,
    evade: PropTypes.number.isRequired,
    exp: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    inPlay: PropTypes.bool.isRequired,
    killed: PropTypes.bool.isRequired,
    magic: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    maxMp: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    str: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
}

export default Hero
