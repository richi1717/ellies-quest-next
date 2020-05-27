// import useSWR from 'swr'
import { random, sampleSize } from 'lodash'
import fetch from 'node-fetch'
import PropTypes from 'prop-types'
import { BattleContainer, Container, GlobalStyle } from '../../pagesStyled'
import { characterMutations } from '../../operations/mutations'
import { normalBattleMusic } from '../../helpers/soundEffects'
import {
  DATA_BASE_URL_CHARACTERS,
  DATA_BASE_URL_MONSTERS,
} from '../../constants/databaseUrls'
import Enemies from '../../components/Enemies'
import Heroes from '../../components/Heroes'
import StatusWindow from '../../components/StatusWindow'
import Header from '../../components/Header'

const battleScenes = ['boss', 'beach', 'desert', 'forest', 'grass'] // use to redirect to different tests

export default function Location ({ battleScene, enemies, heroes }) {
  characterMutations.addEnemies(enemies)
  characterMutations.addHeroes(heroes)
  // normalBattleMusic()

  return (
    <>
      <GlobalStyle />
      <Container battleScene={battleScene}>
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
