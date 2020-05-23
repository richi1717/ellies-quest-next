import styled, { createGlobalStyle } from 'styled-components'
import PropTypes from 'prop-types'
// import useSWR from 'swr'
import { random, sampleSize } from 'lodash'
import fetch from 'node-fetch'
import {
  DATA_BASE_URL_CHARACTERS,
  DATA_BASE_URL_MONSTERS,
} from '../../constants/databaseUrls'
import Heroes from '../../components/Heroes'
import Enemies from '../../components/Enemies'
import StatusWindow from '../../components/StatusWindow'
import { characterMutations } from '../../operations/mutations'
import { normalBattleMusic } from '../../helpers/soundEffects'

const battleScenes = ['boss', 'beach', 'desert', 'forest', 'grass'] // use to redirect to different tests

const Container = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  background-image: url("/img/${(props) => props.battleScene}-battle.png");
  background-size: 50px;
  max-width: 1352px;
  height: 100vh;
  width: 100vw;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
`

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  html {
  font-family: 'Orbitron', sans-serif;
  box-sizing: border-box;
  color: transparent;
  font-size: 10px; }
  *, *::before, *::after {
  box-sizing: inherit;
  color: inherit;
  }

body {
  margin: 0;
  background-color: #212527; }
`

const BattleContainer = styled.div`
  flex: 1;
  height: 500px;
  display: flex;
`

export default function Location ({ battleScene, enemies, heroes }) {
  characterMutations.addCharacters(enemies, heroes)
  characterMutations.addEnemies(enemies)
  characterMutations.addHeroes(heroes)
  // normalBattleMusic()

  return (
    <>
      <GlobalStyle />
      <Container battleScene={battleScene}>
        <BattleContainer>
          <Enemies />
          <Heroes />
        </BattleContainer>
        <StatusWindow heroes={heroes} />
      </Container>
    </>
  )
}

Location.propTypes = {
  battleScene: PropTypes.string.isRequired,
  enemies: PropTypes.arrayOf(PropTypes.object).isRequired,
  heroes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export async function getServerSideProps ({ params }) {
  const heroes = await (await fetch(DATA_BASE_URL_CHARACTERS)).json()
  const monsters = await (await fetch(DATA_BASE_URL_MONSTERS)).json()
  const areaEnemies = monsters.filter((enemy) =>
    enemy.sections.includes(params.battleScene)
  )
  const enemies = sampleSize(areaEnemies, random(1, 5))

  return {
    props: {
      battleScene: params.battleScene,
      heroes: heroes?.filter((hero) => hero.inPlay),
      enemies,
    },
  }
}
