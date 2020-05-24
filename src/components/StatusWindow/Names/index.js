import PropTypes from 'prop-types'
import { CharacterNameButton } from './styled'
import { orderMutations } from '../../../operations/mutations'

const Names = ({ name, selected }) => {
  const handleClick = () => {
    orderMutations.skipTurn()
  }

  return (
    <CharacterNameButton type="button" onClick={handleClick} turn={selected}>
      {name}
    </CharacterNameButton>
  )
}

Names.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default Names
