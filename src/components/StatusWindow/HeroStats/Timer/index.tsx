import React from 'react'
import { isEqual } from 'lodash'
import styled from '@emotion/styled'
import { useBattleStore } from '../../../../store/battleStore'
import { useTimer } from '../../../../hooks'
import CountDownTimer from '../../../../helpers/CountDownTimer'
import {
  redTransparent,
  yellowTransparent,
} from '../../../../constants/variables'
import type { Hero } from '@/types'

const StatusBarContainer = styled.div`
  background-color: ${redTransparent};
  border-radius: 10px;
  height: 5px;
`

const StatusBar = styled.div<{ $width?: string }>`
  background-color: ${yellowTransparent};
  border-radius: 10px;
  height: 5px;
  width: ${({ $width }) => $width ?? '0%'};
`

function Clock({ character }: { character: Hero }) {
  const appendToOrder = useBattleStore((store) => store.appendToOrder)
  const timer = new CountDownTimer(100, 50)

  function format(display: HTMLElement | null) {
    return function (seconds: number) {
      if (character.killed || !display) return
      const percentage = 100 - seconds
      display.style.width = `${percentage}%`
      if (percentage === 100) appendToOrder(character)
    }
  }

  useTimer(timer, character, format)

  return (
    <StatusBarContainer>
      <StatusBar id={`${character.battleName}Time`} />
    </StatusBarContainer>
  )
}

function Timer({ character }: { character: Hero }) {
  if (character.killed) {
    return (
      <StatusBarContainer>
        <StatusBar $width="0%" />
      </StatusBarContainer>
    )
  }
  return <Clock character={character} />
}

function areEqual(prev: { character: Hero }, next: { character: Hero }) {
  return isEqual(prev.character, next.character)
}

export default React.memo(Timer, areEqual)
