import { useQuery } from '@apollo/client'
import { HeroesContainer } from './styled'
import Hero from './Hero'
import { GET_HEROES } from '../../operations/queries/getCharacters'

const Heroes = () => {
  const { data } = useQuery(GET_HEROES)
  const heroes = data?.heroes

  return (
    <HeroesContainer>
      {heroes?.map((hero, index) => (
        <Hero position={index + 1} key={hero.id} hero={hero} />
      ))}
    </HeroesContainer>
  )
}

export default Heroes
