import { clone } from 'lodash'
import { useState } from 'react'
import styled from '@emotion/styled'
import { useBattleStore } from '../../../store/battleStore'
import {
  black,
  blackTransparent2,
  fontFamily,
  gray,
  white,
} from '../../../constants/variables'
import BattleMenuItems from './Items'
import BattleMenuMagic from './Magic'
import Targets from './Targets'
import type { Character } from '@/types'

const ActionStyled = styled('button', {
  shouldForwardProp: (prop) => prop !== '$warn',
})<{ $warn?: boolean }>`
  background: none;
  border: none;
  color: ${white};
  font-family: ${fontFamily};
  font-size: 22pt;
  margin-bottom: 4px;
  margin-top: 0;
  outline: 0;
  padding: 0;
  text-shadow: 2px 1px #8a8a7b;
  &:hover { cursor: pointer; color: blue; }
  &:disabled {
    cursor: default;
    color: ${gray};
    text-shadow: 2px 1px ${black};
    &:hover { cursor: default; }
  }
`

const BattleMenuStyled = styled.div`
  align-items: flex-start;
  background-color: ${blackTransparent2};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  bottom: 0;
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  height: 200px;
  left: 150px;
  min-width: 300px;
  padding: 12px;
  position: absolute;
  text-shadow: 2px 1px #8a8a7b;
  z-index: 1;
`

interface Props {
  stats: Character
}

export default function BattleMenu({ stats }: Props) {
  const [typeOfAction, setTypeOfAction] = useState('')
  const updateStats = useBattleStore((store) => store.updateStats)
  const finishTurn = useBattleStore((store) => store.finishTurn)

  const magicAbilities = (stats as Character & { magicAbilities?: unknown[] }).magicAbilities

  const handleDefend = () => {
    const hero = clone(stats) as Character & { defending: boolean }
    hero.defending = true
    updateStats(hero)
    finishTurn()
  }

  return (
    <BattleMenuStyled>
      <ActionStyled type="button" onClick={() => setTypeOfAction('damage')}>Attack</ActionStyled>
      <ActionStyled
        type="button"
        onClick={() => setTypeOfAction('magic')}
        disabled={!magicAbilities?.length}
      >
        Magic
      </ActionStyled>
      <ActionStyled type="button" onClick={handleDefend}>Defend</ActionStyled>
      <ActionStyled type="button" onClick={() => setTypeOfAction('items')}>Items</ActionStyled>
      <ActionStyled type="button" onClick={() => setTypeOfAction('run')}>RUN!</ActionStyled>

      {typeOfAction === 'damage' && <Targets typeOfAction={typeOfAction} targeter={stats} />}
      {typeOfAction === 'magic' && <BattleMenuMagic targeter={stats} />}
      {typeOfAction === 'items' && <BattleMenuItems targeter={stats} />}
    </BattleMenuStyled>
  )
}
