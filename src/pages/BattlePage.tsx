import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { random, sampleSize } from 'lodash'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'
import { useBattleStore } from '../store/battleStore'
import { fetchEnemies, fetchHeroes, fetchItems } from '../services/gameData'
import Enemies from '../components/Enemies'
import Heroes from '../components/Heroes'
import StatusWindow from '../components/StatusWindow'
import Header from '../components/Header'
import type { BattleScene } from '@/types'

const globalStyles = css`
  body {
    background-color: #212527;
  }
  html {
    font-family: 'Istok Web', sans-serif;
    box-sizing: border-box;
    font-size: 10px;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  html,
  body {
    margin: 0;
  }
`

const Container = styled.div<{ $battleScene: string }>`
  background-image: url('/img/${({ $battleScene }) => $battleScene}-battle.png');
  background-size: cover;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1352px;
  position: relative;
  width: 100vw;
`

const BattleContainer = styled.div`
  display: flex;
  flex: 1;
  height: 500px;
`

export default function BattlePage() {
  const { battleScene = 'forest' } = useParams<{ battleScene: BattleScene }>()

  const addHeroes = useBattleStore((store) => store.addHeroes)
  const addEnemies = useBattleStore((store) => store.addEnemies)
  const addItems = useBattleStore((store) => store.addItems)
  const startATBLoop = useBattleStore((store) => store.startATBLoop)
  const stopATBLoop = useBattleStore((store) => store.stopATBLoop)

  const heroesQuery = useQuery({ queryKey: ['heroes'], queryFn: fetchHeroes })
  const enemiesQuery = useQuery({
    queryKey: ['enemies'],
    queryFn: fetchEnemies,
  })
  const itemsQuery = useQuery({ queryKey: ['items'], queryFn: fetchItems })

  useEffect(() => {
    if (!heroesQuery.data || !enemiesQuery.data || !itemsQuery.data) return

    const playableHeroes = heroesQuery.data.filter((hero) => hero.inPlay)
    const areaEnemies = enemiesQuery.data.filter((enemy) => enemy.sections.includes(battleScene))
    const selectedEnemies = sampleSize(areaEnemies, random(1, 5))

    addHeroes(playableHeroes)
    addEnemies(selectedEnemies)
    addItems(itemsQuery.data)
    startATBLoop()

    return () => stopATBLoop()
  }, [heroesQuery.data, enemiesQuery.data, itemsQuery.data, battleScene])

  const errors = [heroesQuery.error, enemiesQuery.error, itemsQuery.error].filter(Boolean)
  if (errors.length) {
    return (
      <div style={{ color: 'white', padding: '2rem', fontFamily: 'monospace' }}>
        <p>Firebase error:</p>
        {errors.map((err, idx) => (
          <pre key={idx}>{String(err)}</pre>
        ))}
      </div>
    )
  }

  if (heroesQuery.isLoading || enemiesQuery.isLoading || itemsQuery.isLoading) {
    return <div style={{ color: 'white', padding: '2rem' }}>Loading battle...</div>
  }

  return (
    <>
      <Global styles={globalStyles} />
      <Container $battleScene={battleScene}>
        <Header />
        <BattleContainer>
          <Enemies />
          <Heroes />
        </BattleContainer>
        <StatusWindow />
      </Container>
    </>
  )
}
