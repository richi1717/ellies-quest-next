import { useState } from 'react'
import styled from '@emotion/styled'
import { useBattleStore } from '../../../../store/battleStore'
import {
  black,
  blackTransparent2,
  fontFamily,
  gray,
  white,
} from '../../../../constants/variables'
import Targets from '../Targets'
import type { Character, Item } from '@/types'

const ActionStyled = styled('button', {
  shouldForwardProp: (prop) => prop !== '$warn',
})<{ $warn?: boolean }>`
  align-items: center;
  background: none;
  border: none;
  color: ${white};
  display: flex;
  flex-direction: row;
  font-family: ${fontFamily};
  font-size: 22pt;
  justify-content: space-between;
  margin-bottom: 4px;
  margin-top: 0;
  outline: 0;
  padding: 0 10px;
  text-shadow: 2px 1px #8a8a7b;
  width: 100%;
  &:hover { cursor: pointer; color: blue; }
  &:disabled {
    color: ${gray};
    text-shadow: 2px 1px ${black};
    &:hover { cursor: default; }
  }
`

const ItemsContainerStyled = styled.div`
  align-items: flex-start;
  background-color: ${blackTransparent2};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  bottom: 40px;
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: flex-start;
  left: 40px;
  min-width: 300px;
  overflow: auto;
  position: absolute;
  text-shadow: 2px 1px #8a8a7b;
  z-index: 1;
`

interface Props {
  targeter: Character
}

export default function BattleMenuItems({ targeter }: Props) {
  const items = useBattleStore((store) => store.items)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [typeOfAction, setTypeOfAction] = useState<string>('')

  const handleClick = (item: Item) => {
    if (item.revive) setTypeOfAction('revive')
    else if (item.damage) setTypeOfAction('itemDamage')
    else if (item.restore) setTypeOfAction('heal')
    setSelectedItem(item)
  }

  return (
    <>
      <ItemsContainerStyled>
        {items
          .filter((item) => item.amount > 0 && item.battle)
          .map((item) => (
            <ActionStyled
              key={item.id}
              type="button"
              disabled={item.amount === 0}
              onClick={() => handleClick(item)}
            >
              <span>{item.name}</span>
              <span>{item.amount}</span>
            </ActionStyled>
          ))}
      </ItemsContainerStyled>
      {typeOfAction && selectedItem && (
        <Targets targeter={targeter} typeOfAction={typeOfAction} item={selectedItem} sub />
      )}
    </>
  )
}
