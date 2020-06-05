import { isEqual } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { orderMutations } from '../../../../operations/mutations'
import { StatusBar, StatusBarContainer } from './styled'
import { useTimer } from '../../../../hooks'
import CountDownTimer from '../../../../helpers/CountDownTimer'

function Clock ({ character }) {
  const timer = new CountDownTimer(100, 50)

  function format (display) {
    return function (seconds) {
      if (character?.killed) {
        return false
      }

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

Clock.propTypes = {
  character: PropTypes.object.isRequired,
}

function Timer ({ character }) {
  if (character?.killed) {
    return (
      <StatusBarContainer>
        <StatusBar type="time" style={{ width: '0%' }} />
      </StatusBarContainer>
    )
  }

  return <Clock character={character} />
}

Timer.propTypes = {
  character: PropTypes.object.isRequired,
}

function areEqual (prevProps, nextProps) {
  return isEqual(prevProps.character, nextProps.character)
}

export default React.memo(Timer, areEqual)
