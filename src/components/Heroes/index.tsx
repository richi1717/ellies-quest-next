import styled from '@emotion/styled'
import { useBattleStore } from '../../store/battleStore'
import HeroComponent from './Hero'

const HeroesContainer = styled.div`
  flex: 0.5;
  position: relative;
`

export default function Heroes() {
  const heroes = useBattleStore((store) => store.heroes)

  return (
    <HeroesContainer id="heroesContainer">
      {heroes.map((hero, index) => (
        <HeroComponent position={index + 1} key={hero.id} hero={hero} />
      ))}
    </HeroesContainer>
  )
}
