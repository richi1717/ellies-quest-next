import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { CharacterNameButton } from './styled'
import { orderMutations } from '../../../operations/mutations'
import { GET_WHOSE_TURN_CHARACTER_NAME } from './constants'

const Names = ({ hero }) => {
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN_CHARACTER_NAME)
  const selected = whoseTurnQuery?.data?.whoseTurn?.name === hero.name

  const handleClick = () => {
    orderMutations.setWhoseTurn()
  }

  return (
    <CharacterNameButton type="button" onClick={handleClick} turn={selected}>
      {hero.name}
    </CharacterNameButton>
  )
}

Names.propTypes = {
  hero: PropTypes.object.isRequired,
}

export default Names
