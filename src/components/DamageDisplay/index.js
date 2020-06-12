import PropTypes from 'prop-types'
import { Damage } from './styled'

const DamageDisplay = ({ amount, isDamage, battleName }) => {
  return (
    <Damage id={`damageDisplay${battleName}`} isDamage={isDamage}>
      {amount}
    </Damage>
  )
}

DamageDisplay.propTypes = {
  amount: PropTypes.number.isRequired,
  isDamage: PropTypes.bool,
  battleName: PropTypes.string.isRequired,
}

DamageDisplay.defaultProps = {
  isDamage: true,
}

export default DamageDisplay
