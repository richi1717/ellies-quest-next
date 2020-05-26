import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { GET_CHARACTERS } from '../../../../operations/queries/getCharacters'
import { NameStyled, TargetsContainerStyled } from './styled'

const Targets = ({ targeter, typeOfAction }) => {
  const getCharactersQuery = useQuery(GET_CHARACTERS)
  const { enemies, heroes } = getCharactersQuery?.data
  const areItemsSelected = false
  const NamesOfHeroes = () =>
    heroes.map((hero) => {
      // [TODO] see if these two could be re-worked into just one component that takes
      // character and uses that with maybe passed in check for warn?
      const warn =
        typeOfAction === 'damage' ||
        (!hero.killed && typeOfAction === 'revive') ||
        (hero.killed && typeOfAction === 'heal')

      return (
        <NameStyled
          key={hero.battleName}
          type="button"
          warn={warn}
          onClick={() => {
            completeAction(hero.battleName, targeter, typeOfAction)
          }}
        >
          {hero.name}
        </NameStyled>
      )
    })

  function completeAction (target, targeter, typeOfAction) {
    // take care of calculating damage here
    // take care of figuring out the type of "damage"
    // if it's heal then add,
    // if it's damage then subtract,
    // if it's revive then see if dead or undead,
    // if it's damage or heal but dead
    console.log(target, targeter, typeOfAction)
  }

  const NamesOfEnemies = () =>
    enemies.map((enemy) => {
      const warn = ['heal', 'revive'].includes(typeOfAction)

      return (
        <NameStyled
          key={enemy.battleName}
          type="button"
          warn={warn}
          onClick={() => {
            completeAction(enemy.battleName, targeter, typeOfAction)
          }}
        >
          {enemy.name}
        </NameStyled>
      )
    })

  const isMoreThanFive = () => enemies.length + heroes.length > 5

  return (
    <TargetsContainerStyled moreThanFive={isMoreThanFive()}>
      {areItemsSelected ? <NamesOfHeroes /> : <NamesOfEnemies />}
      {areItemsSelected ? <NamesOfEnemies /> : <NamesOfHeroes />}
    </TargetsContainerStyled>
  )
}

Targets.propTypes = {
  targeter: PropTypes.string.isRequired,
  typeOfAction: PropTypes.oneOf(['damage', 'heal', 'revive']).isRequired,
}

export default Targets
