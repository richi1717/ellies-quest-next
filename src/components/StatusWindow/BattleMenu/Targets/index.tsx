import styled from '@emotion/styled'
import { useBattleStore } from '../../../../store/battleStore'
import completeAction from '../../../../helpers/completeAction'
import {
  black,
  blackTransparent2,
  fontFamily,
  white,
  yellowTransparent,
} from '../../../../constants/variables'
import type { Character, Item, MagicSpell } from '@/types'

const NameStyled = styled('button', {
  shouldForwardProp: (prop) => prop !== '$warn',
})<{ $warn: boolean }>`
  background: none;
  border: none;
  color: ${({ $warn }) => ($warn ? yellowTransparent : white)};
  font-family: ${fontFamily};
  font-size: 22pt;
  margin-bottom: 4px;
  margin-top: 0;
  outline: 0;
  padding: 0;
  text-shadow: 2px 1px ${({ $warn }) => ($warn ? black : '#8a8a7b')};
  &:hover {
    cursor: pointer;
    color: blue;
  }
`

const TargetsContainerStyled = styled('div', {
  shouldForwardProp: (prop) => !['$sub', '$moreThanFive'].includes(prop as string),
})<{ $sub: boolean; $moreThanFive: boolean }>`
  align-items: flex-start;
  background-color: ${blackTransparent2};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  bottom: ${({ $sub }) => ($sub ? 80 : 40)}px;
  box-shadow:
    3px 3px ${black},
    -3px -3px ${black},
    -3px 3px ${black},
    3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 200px;
  justify-content: flex-start;
  left: ${({ $sub }) => ($sub ? 80 : 40)}px;
  min-width: ${({ $moreThanFive }) => ($moreThanFive ? 600 : 300)}px;
  padding: 12px;
  position: absolute;
  text-shadow: 2px 1px #8a8a7b;
  z-index: 1;
`

interface Props {
  targeter: Character
  typeOfAction: string
  typeOfMagic?: MagicSpell
  item?: Item
  sub?: boolean
}

export default function Targets({ item, sub = false, targeter, typeOfAction, typeOfMagic }: Props) {
  const heroes = useBattleStore((store) => store.heroes)
  const enemies = useBattleStore((store) => store.enemies)

  const moreThanFive = enemies.length + heroes.length > 5

  const isHeroWarn = (hero: Character) => {
    const isDamageAction = ['damage', 'magicDamage', 'itemDamage'].includes(typeOfAction)
    const isReviveOnAlive = !('killed' in hero && hero.killed) && typeOfAction === 'revive'
    const isHealOnDead = 'killed' in hero && hero.killed && typeOfAction === 'heal'
    return isDamageAction || isReviveOnAlive || isHealOnDead
  }

  return (
    <TargetsContainerStyled $moreThanFive={moreThanFive} $sub={sub}>
      {enemies.map((enemy) => (
        <NameStyled
          key={enemy.battleName}
          type="button"
          $warn={['heal', 'revive'].includes(typeOfAction)}
          onClick={() =>
            completeAction(enemy.battleName, targeter, typeOfAction, typeOfMagic, item)
          }
        >
          {enemy.name}
        </NameStyled>
      ))}
      {heroes.map((hero) => (
        <NameStyled
          key={hero.battleName}
          type="button"
          $warn={isHeroWarn(hero)}
          onClick={() => completeAction(hero.battleName, targeter, typeOfAction, typeOfMagic, item)}
        >
          {hero.name}
        </NameStyled>
      ))}
    </TargetsContainerStyled>
  )
}
