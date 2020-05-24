import PropTypes from 'prop-types'
import { orderMutations } from '../../../operations/mutations'
import { StatusBar, StatusBarContainer } from './styled'
import { useTimer } from '../../../hooks'
import CountDownTimer from '../../../helpers/CountDownTimer'

export default function Timer ({ character }) {
  const timer = new CountDownTimer(100, 50)

  function format (display) {
    return function (seconds) {
      const percentage = 100 - seconds
      display.style.width = `${percentage}%`

      if (percentage === 100) {
        orderMutations.append(character)
      }
    }
  }

  useTimer(timer, character, format)

  return (
    <StatusBarContainer>
      <StatusBar id={`${character.battleName}Time`} type="time" />
    </StatusBarContainer>
  )
}

Timer.propTypes = {
  character: PropTypes.object.isRequired,
}
