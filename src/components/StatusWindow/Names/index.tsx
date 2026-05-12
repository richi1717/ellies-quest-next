import styled from '@emotion/styled'
import { useBattleStore } from '../../../store/battleStore'
import { black, gray, white } from '../../../constants/variables'

const CharacterNameButton = styled('button', {
  shouldForwardProp: (prop) => prop !== '$turn',
})<{ $turn: boolean }>`
  background: none;
  border: none;
  color: ${({ $turn }) => ($turn ? gray : white)};
  font-size: 32px;
  outline: 0;
  padding: 5px 0 0;
  text-align: left;
  text-shadow: 2px 1px ${black};
`

interface Props {
  name: string
  selected: boolean
}

export default function Names({ name, selected }: Props) {
  const skipTurn = useBattleStore((store) => store.skipTurn)

  return (
    <CharacterNameButton type="button" onClick={skipTurn} $turn={selected}>
      {name}
    </CharacterNameButton>
  )
}
