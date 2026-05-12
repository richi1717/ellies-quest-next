import { isEmpty, random } from 'lodash'
import { useState } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { useBattleStore } from '../../../store/battleStore'
import { useDelayedEffect, useSoundFX, useTimer } from '../../../hooks'
import completeAction from '../../../helpers/completeAction'
import CountDownTimer from '../../../helpers/CountDownTimer'
import DamageDisplay from '../../DamageDisplay'
import MagicDisplay from '../../MagicDisplay'
import type { Enemy } from '@/types'

const enemySprite: Record<string, string> = {
  'enemy-green-eagle': '0 0',
  'enemy-red-eagle': '-85px 0',
  'enemy-blue-hornet': '-176px 0',
  'enemy-green-hornet': '-275px 0',
  'enemy-flying-yellow-brain': '-375px 0',
  'enemy-flying-red-brain': '-475px 0',
  'enemy-yellow-fish': '-565px 0',
  'enemy-blue-fish': '-650px 0',
  'enemy-green-blob': '-740px 0',
  'enemy-yellow-blob': '-830px 0',
  'enemy-red-blob': '-920px 0',
  'enemy-blue-blob': '-1010px 0',
  'enemy-yellow-antman': '-1105px 0',
  'enemy-green-antman': '-1195px 0',
  'enemy-blue-antman': '-1290px 0',
  'enemy-blue-tapeworm': '-1377px 0',
  'enemy-red-tapeworm': '-1468px 0',
  'enemy-orange-babydemon': '-1560px 0',
  'enemy-red-babydemon': '-1660px 0',
  'enemy-green-babydemon': '-1750px 0',
  'enemy-gray-mouse': '-1840px 0',
  'enemy-gold-mouse': '-1945px 0',
}

const enemyPosition: Record<string, Record<string, string>> = {
  enemy1: { top: '40%', left: '25%' },
  enemy2: { top: '60%', left: '25%' },
  enemy3: { top: '50%', left: '10%' },
  enemy4: { top: '30%', left: '10%' },
  enemy5: { top: '70%', left: '10%' },
}

const attackingPosition: Record<string, Record<string, string>> = {
  hero0: { top: '35%', left: '110%' },
  hero1: { top: '75%', left: '110%' },
  hero2: { top: '55%', left: '120%' },
}

const fade = keyframes`
  0% { opacity: 1; }
  25% { opacity: 0.5; }
  50% { opacity: 0; }
  75% { opacity: 0.5; }
  100% { opacity: 1; }
`

const EnemyDisplayStyled = styled('div', {
  shouldForwardProp: (prop) => !['classes', 'enemyId', 'attackTarget'].includes(prop as string),
})<{ classes: string; enemyId: string; attackTarget: string }>`
  background-image: url('/img/monsters2.png');
  background-size: 2220px;
  position: absolute;
  height: 100px;
  width: 90px;
  background-position: ${({ classes }) => enemySprite[classes] ?? '0 0'};
  z-index: 2;
  transition: top 1.5s ease, left 1.5s ease;
  ${({ enemyId }) => enemyPosition[enemyId] ?? {}};
  ${({ attackTarget }) => attackingPosition[attackTarget] ?? {}};
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
  enemy: Enemy
  position: number
}

export default function EnemyComponent({ enemy, position }: Props) {
  const battleName = `enemy${position}`
  const heroes = useBattleStore((store) => store.heroes)
  const whoseTurn = useBattleStore((store) => store.whoseTurn)
  const magicDisplay = useBattleStore((store) => store.magicDisplay)
  const whoIsReceivingAction = useBattleStore((store) => store.whoIsReceivingAction)
  const setWhoIsReceivingAction = useBattleStore((store) => store.setWhoIsReceivingAction)
  const appendToOrder = useBattleStore((store) => store.appendToOrder)

  const [target, setTarget] = useState<(typeof heroes)[0] | null>(null)
  const { play } = useSoundFX('enemyAttackFX')
  const attacking = whoseTurn?.battleName === battleName

  const timer = new CountDownTimer(100, 50)

  function handleTick() {
    return function (seconds: number) {
      const percentage = 100 - seconds
      if (percentage === 100) appendToOrder(enemy)
    }
  }

  useTimer(timer, enemy, handleTick)

  useDelayedEffect(
    () => {
      if (isEmpty(whoseTurn)) appendToOrder(enemy)
    },
    100 - enemy.agility,
    []
  )

  useDelayedEffect(
    () => {
      if (whoIsReceivingAction?.target === battleName) {
        setWhoIsReceivingAction(null)
      }
    },
    2000,
    [whoIsReceivingAction?.target]
  )

  useDelayedEffect(
    () => {
      if (attacking) {
        const alive = heroes.filter((h) => !h.killed)
        const selected = alive[random(0, alive.length - 1)]
        setTarget(selected ?? null)
      }
    },
    1000,
    [attacking]
  )

  useDelayedEffect(
    () => {
      if (target) {
        setTarget(null)
        play()
        completeAction(target.battleName, enemy, 'damage')
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
        enemyId={battleName}
        attackTarget={target?.battleName ?? ''}
      >
        {magicDisplay?.target === battleName && <MagicDisplay type={magicDisplay.type} />}
        {whoIsReceivingAction?.target === battleName && (
          <DamageDisplay
            amount={whoIsReceivingAction.amount}
            isDamage={whoIsReceivingAction.type === 'damage'}
            battleName={battleName}
          />
        )}
        {attacking && <TurnStyled />}
      </EnemyDisplayStyled>
    </div>
  )
}
