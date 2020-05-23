import styled from 'styled-components'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { orderMutations } from '../../../operations/mutations'
import {
  greenTransparent,
  lightBlueTransparent,
  redTransparent,
  yellowTransparent,
} from '../../../constants/variables'
import CountDownTimer from '../../../helpers/CountDownTimer'

const StatusBarContainer = styled.div`
  height: 5px;
  background-color: ${redTransparent};
`

const StatusBar = styled.div`
  background-color: ${(props) => {
    const obj = { hp: greenTransparent, mp: lightBlueTransparent, time: yellowTransparent }
    return obj[props.type]
  }};
  border-radius: 10px;
  height: 5px;
  width: ${(props) => props.width}%;
`

export default function StatusTimer ({ agility, character }) {
  useEffect(() => {
    function listener () {
      const timerEl = document.getElementById(`${character.battleName}Time`)
      const timer = new CountDownTimer(100, 50)

      timer
        .onTick(format(timerEl))
        .setAgility(agility)
        .start()

      function format (display) {
        return function (seconds) {
          const percentage = 100 - seconds
          display.style.width = `${percentage}%`

          if (percentage === 100) {
            orderMutations.append(character)
          }
        }
      }
    }

    window.addEventListener('load', listener)

    return () => {
      window.removeEventListener('load', listener)
    }
  }, [])

  return (
    <StatusBarContainer>
      <StatusBar id={`${character.battleName}Time`} type="time" />
    </StatusBarContainer>
  )
}

StatusTimer.propTypes = {
  agility: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
}
