import { useQuery } from '@apollo/client'
import { EnemiesContainer } from './styled'
import Enemy from './Enemy'
import { GET_ENEMIES } from '../../operations/queries/getCharacters'

const Enemies = () => {
  const { data } = useQuery(GET_ENEMIES)
  const enemies = data?.enemies

  return (
    <EnemiesContainer>
      {enemies.map((enemy, index) => (
        <Enemy position={index + 1} key={enemy.id} enemy={enemy} />
      ))}
    </EnemiesContainer>
  )
}

export default Enemies
