import React from 'react'
import styled from '@emotion/styled'
import { useBattleStore } from '../../../../store/battleStore'
import { redTransparent, yellowTransparent } from '../../../../constants/variables'
import type { Hero } from '@/types'

const StatusBarContainer = styled.div`
  background-color: ${redTransparent};
  border-radius: 10px;
  height: 5px;
`

const StatusBar = styled.div<{ $width: string }>`
  background-color: ${yellowTransparent};
  border-radius: 10px;
  height: 5px;
  width: ${({ $width }) => $width};
`

function Timer({ character }: { character: Hero }) {
  const fill = useBattleStore((store) => store.atbFills[character.battleName] ?? 0)

  return (
    <StatusBarContainer>
      <StatusBar $width={`${Math.round(fill)}%`} />
    </StatusBarContainer>
  )
}

function areEqual(prev: { character: Hero }, next: { character: Hero }) {
  return (
    prev.character.battleName === next.character.battleName &&
    prev.character.killed === next.character.killed
  )
}

export default React.memo(Timer, areEqual)
