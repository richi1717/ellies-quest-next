import styled from '@emotion/styled'
import { useBattleStore } from '../../store/battleStore'
import EnemyComponent from './Enemy'

const EnemiesContainer = styled.div`
  flex: 1;
  position: relative;
`

export default function Enemies() {
  const enemies = useBattleStore((s) => s.enemies)

  return (
    <EnemiesContainer>
      {enemies.map((enemy, idx) => (
        <EnemyComponent position={idx + 1} key={enemy.id} enemy={enemy} />
      ))}
    </EnemiesContainer>
  )
}
