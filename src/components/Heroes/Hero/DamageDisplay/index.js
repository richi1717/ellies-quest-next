import PropTypes from 'prop-types'
import { Damage } from './styled'

const DamageDisplay = ({ amount, isDamage, position }) => {
  return (
    <Damage id={`damageDisplayHero${position}`} isDamage={isDamage}>
      {amount}
    </Damage>
  )
}

DamageDisplay.propTypes = {
  amount: PropTypes.number.isRequired,
  isDamage: PropTypes.bool,
  position: PropTypes.number.isRequired,
}

DamageDisplay.defaultProps = {
  isDamage: true,
}

export default DamageDisplay
