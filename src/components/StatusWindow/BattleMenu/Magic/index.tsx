import { useState } from 'react'
import styled from '@emotion/styled'
import {
  black,
  blackTransparent2,
  fontFamily,
  gray,
  white,
  yellowTransparent,
} from '../../../../constants/variables'
import Targets from '../Targets'
import type { Character, MagicSpell } from '@/types'

const MagicContainerStyled = styled.div`
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
  padding: 12px;
  position: absolute;
  text-shadow: 2px 1px #8a8a7b;
  z-index: 1;
`

const MagicNameStyled = styled('button', {
  shouldForwardProp: (prop) => prop !== '$warn',
})<{ $warn?: boolean }>`
  background: none;
  border: none;
  color: ${({ $warn }) => ($warn ? yellowTransparent : white)};
  display: flex;
  flex-direction: row;
  font-family: ${fontFamily};
  font-size: 22pt;
  justify-content: space-between;
  margin-bottom: 4px;
  margin-top: 0;
  outline: 0;
  padding: 0;
  text-shadow: 2px 1px ${({ $warn }) => ($warn ? black : '#8a8a7b')};
  width: 100%;
  &:hover { cursor: pointer; color: blue; }
  &:disabled {
    color: ${gray};
    text-shadow: 2px 1px ${black};
    &:hover { cursor: default; }
  }
`

interface Props {
  targeter: Character
}

export default function BattleMenuMagic({ targeter }: Props) {
  const [typeOfMagic, setTypeOfMagic] = useState<MagicSpell | null>(null)
  const [typeOfAction, setTypeOfAction] = useState<string>('')

  const magicAbilities = (targeter as Character & { magicAbilities?: MagicSpell[] }).magicAbilities

  const handleMagicClick = (magic: MagicSpell) => {
    const name = magic.name.toLowerCase()
    if (name.includes('cure')) setTypeOfAction('heal')
    else if (name.includes('revive')) setTypeOfAction('revive')
    else setTypeOfAction('magicDamage')
    setTypeOfMagic(magic)
  }

  return (
    <>
      <MagicContainerStyled>
        {magicAbilities?.map((magic) => (
          <MagicNameStyled
            key={magic.name}
            type="button"
            disabled={(targeter as Character & { currentMp: number }).currentMp - magic.cost < 0}
            onClick={() => handleMagicClick(magic)}
          >
            <span>{magic.name}</span>
            <span>{magic.cost}MP</span>
          </MagicNameStyled>
        ))}
      </MagicContainerStyled>
      {typeOfAction && typeOfMagic && (
        <Targets targeter={targeter} typeOfAction={typeOfAction} typeOfMagic={typeOfMagic} sub />
      )}
    </>
  )
}
