import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useBattleStore } from '../../store/battleStore'
import { useSoundFX } from '../../hooks'
import { black, blackTransparent, white } from '../../constants/variables'

const ContainerStyled = styled.div`
  align-items: center;
  background-color: ${blackTransparent};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  font-size: 16px;
  height: 100vh;
  text-shadow: 2px 1px ${black};
  width: 100vw;
`

const CardStyled = styled.div`
  align-items: center;
  background-color: ${blackTransparent};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  font-size: 16px;
  text-shadow: 2px 1px ${black};
`

export default function Victory() {
  const usedItems = useBattleStore((store) => store.usedItems)
  const { play } = useSoundFX('battleVictoryMusic')

  useEffect(() => {
    play()
  }, [])

  const droppedItems = usedItems.filter((item) => item.drops)

  return (
    <ContainerStyled>
      You Win!
      {droppedItems.map((item) => (
        <CardStyled key={item.name}>
          {item.name} X {item.drops}
        </CardStyled>
      ))}
    </ContainerStyled>
  )
}
