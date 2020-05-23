import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  greenTransparent,
  lightBlueTransparent,
  redTransparent,
  yellowTransparent,
} from '../../constants/variables'
import StatusTimer from './Timer'

const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const CurrentStatsContainer = styled.div`
  flex: 2;
  align-self: flex-end;
  color: ${(props) => (props['data-low'] ? redTransparent : 'inherit')};

  &:not(:last-child) {
    padding: 0 70px 0 0;
  }
`

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

export default function StatusBars ({ stat }) {
  const hpPercentage = Math.ceil((stat.currentHp / stat.maxHp) * 100)
  const mpPercentage = Math.ceil((stat.currentMp / stat.maxMp) * 100)

  return (
    <StatusContainer>
      <CurrentStatsContainer data-low={hpPercentage <= 95}>
        {stat.currentHp}/{stat.maxHp}
        <StatusBarContainer>
          <StatusBar type="hp" width={hpPercentage} />
        </StatusBarContainer>
      </CurrentStatsContainer>
      <CurrentStatsContainer data-low={mpPercentage <= 25}>
        {stat.currentMp}/{stat.maxMp}
        <StatusBarContainer>
          <StatusBar type="mp" width={mpPercentage} />
        </StatusBarContainer>
      </CurrentStatsContainer>
      <CurrentStatsContainer>
        <StatusTimer agility={stat.agility} name={stat.battleName} character={stat} />
      </CurrentStatsContainer>
    </StatusContainer>
  )
}

StatusBars.propTypes = {
  stat: PropTypes.shape({
    agility: PropTypes.number.isRequired,
    battleName: PropTypes.string.isRequired,
    currentHp: PropTypes.number.isRequired,
    currentMp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    maxMp: PropTypes.number.isRequired,
  }).isRequired,
}
