import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { completeAction } from './helpers'
import { GET_CHARACTERS } from '../../../../operations/queries/getCharacters'
import { NameStyled, TargetsContainerStyled } from './styled'

const Targets = ({ targeter, typeOfAction, typeOfMagic }) => {
  const getCharactersQuery = useQuery(GET_CHARACTERS)
  const { enemies, heroes } = getCharactersQuery?.data
  const areItemsSelected = false

  const NamesOfHeroes = () =>
    heroes.map((hero) => {
      // [TODO] see if these two could be re-worked into just one component that takes
      // character and uses that with maybe passed in check for warn?
      const warn =
        typeOfAction === 'damage' ||
        typeOfAction === 'magicDamage' ||
        (!hero.killed && typeOfAction === 'revive') ||
        (hero.killed && typeOfAction === 'heal')

      return (
        <NameStyled
          key={hero.battleName}
          type="button"
          warn={warn}
          onClick={() => {
            completeAction(hero.battleName, targeter, typeOfAction, typeOfMagic)
          }}
        >
          {hero.name}
        </NameStyled>
      )
    })

  const NamesOfEnemies = () =>
    enemies.map((enemy) => {
      const warn = ['heal', 'revive'].includes(typeOfAction)

      return (
        <NameStyled
          key={enemy.battleName}
          type="button"
          warn={warn}
          onClick={() => {
            completeAction(enemy.battleName, targeter, typeOfAction, typeOfMagic)
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
  targeter: PropTypes.object.isRequired,
  typeOfAction: PropTypes.oneOf(['damage', 'heal', 'magicDamage', 'revive']).isRequired,
  typeOfMagic: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
  }),
}

export default Targets
