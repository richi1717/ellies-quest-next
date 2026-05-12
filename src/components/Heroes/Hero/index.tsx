import { isEmpty } from 'lodash'
import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import { useBattleStore } from '../../../store/battleStore'
import { useDelayedEffect, useSoundFX, useTimer } from '../../../hooks'
import DamageDisplay from '../../DamageDisplay'
import MagicDisplay from '../../MagicDisplay'
import CountDownTimer from '../../../helpers/CountDownTimer'
import type { Hero } from '@/types'

const multiplier = (amount: number) => `-${amount * 115}px`
const setBackgroundPos = (x: number, y: number) => `${multiplier(x)} ${multiplier(y)}`

const heroPosition: Record<number, { top: string; left: string }> = {
  1: { top: '30%', left: '25%' },
  2: { top: '70%', left: '25%' },
  3: { top: '50%', left: '50%' },
}

const attackingPosition: Record<string, { top: string; left: string }> = {
  enemy1: { top: '40%', left: '-140%' },
  enemy2: { top: '60%', left: '-140%' },
  enemy3: { top: '50%', left: '-170%' },
  enemy4: { top: '30%', left: '-170%' },
  enemy5: { top: '70%', left: '-170%' },
}

const spritePosition: Record<string, string> = {
  'red-boy': setBackgroundPos(0, 0),
  'white-girl': setBackgroundPos(0, 1),
  'green-boy': setBackgroundPos(0, 2),
}

const swing = keyframes`
  50% { background-position-x: -220px; }
`

const HeroStyled = styled('div', {
  shouldForwardProp: (prop) =>
    !['attacking', 'attackPosition', 'defending', 'killed', 'heroPosition', 'spriteName'].includes(
      prop as string
    ),
})<{
  heroPosition: number
  spriteName: string
  attacking: boolean
  attackPosition: string
  defending: boolean
  killed: boolean
}>`
  flex: 0.5;
  z-index: 1;
  transition: top 1s ease, left 1s ease;
  position: absolute;
  background-image: url('/img/battle-sprites2.png');
  background-size: 820px;
  height: 120px;
  width: 120px;
  top: ${({ heroPosition: p }) => heroPosition[p]?.top ?? '50%'};
  left: ${({ heroPosition: p, attacking }) => (attacking ? '0' : heroPosition[p]?.left ?? '25%')};
  background-position: ${({ spriteName }) => spritePosition[spriteName] ?? setBackgroundPos(0, 0)};
  background-position-x: ${({ attacking }) => attacking && multiplier(1)};
  background-position-x: ${({ killed }) => killed && multiplier(6)};
  background-position-x: ${({ defending, attacking, killed }) =>
    defending && !attacking && !killed && multiplier(3)};
  ${({ attackPosition }) => attackingPosition[attackPosition] ?? {}};
  ${({ attackPosition }) =>
    attackPosition &&
    css`
      animation: ${swing} 2s steps(1) 1;
    `}
`

const fade = keyframes`
  0% { opacity: 1; }
  25% { opacity: 0.5; }
  50% { opacity: 0; }
  75% { opacity: 0.5; }
  100% { opacity: 1; }
`

const TurnStyled = styled.div`
  animation: ${fade} 2s linear infinite;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 30px solid rgba(255, 255, 0, 0.8);
  height: 0;
  margin-left: 40%;
  margin-top: -30%;
  width: 0;
`

interface Props {
  hero: Hero
  position: number
}

export default function HeroComponent({ hero, position }: Props) {
  const { battleName, classes, defending = false, killed } = hero
  const whoseTurn = useBattleStore((store) => store.whoseTurn)
  const magicDisplay = useBattleStore((store) => store.magicDisplay)
  const whoIsReceivingAction = useBattleStore((store) => store.whoIsReceivingAction)
  const combatDetails = useBattleStore((store) => store.combatDetails)
  const setWhoIsReceivingAction = useBattleStore((store) => store.setWhoIsReceivingAction)
  const appendToOrder = useBattleStore((store) => store.appendToOrder)

  const isAttacking =
    combatDetails?.type === 'damage' && combatDetails.targeter?.battleName === battleName
  const attacking = whoseTurn?.battleName === battleName
  const attackPosition = isAttacking ? combatDetails?.target?.battleName ?? '' : ''

  const { play } = useSoundFX('heroAttackFX')
  const timer = new CountDownTimer(100, 50)

  function handleTick() {
    return function (seconds: number) {
      if (100 - seconds === 100) appendToOrder(hero)
    }
  }

  useTimer(timer, hero, handleTick)

  useDelayedEffect(
    () => { if (isAttacking) play() },
    1000,
    [isAttacking]
  )

  useDelayedEffect(
    () => {
      if (whoIsReceivingAction?.target === battleName) setWhoIsReceivingAction(null)
    },
    2000,
    [whoIsReceivingAction?.target]
  )

  useDelayedEffect(
    () => {
      if (isEmpty(whoseTurn)) appendToOrder(hero)
    },
    100 - hero.agility,
    []
  )

  return (
    <HeroStyled
      id={battleName}
      heroPosition={position}
      spriteName={classes}
      attacking={attacking}
      attackPosition={attackPosition}
      defending={defending}
      killed={killed}
    >
      {attacking && <TurnStyled />}
      {whoIsReceivingAction?.target === battleName && (
        <DamageDisplay
          amount={whoIsReceivingAction.amount}
          isDamage={whoIsReceivingAction.type === 'damage'}
          battleName={battleName}
        />
      )}
      {magicDisplay?.target === battleName && <MagicDisplay type={magicDisplay.type} />}
    </HeroStyled>
  )
}
