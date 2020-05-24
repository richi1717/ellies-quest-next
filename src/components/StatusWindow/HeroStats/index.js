import PropTypes from 'prop-types'
import StatusTimer from '../Timer'
import {
  CurrentStatsContainer,
  StatusBar,
  StatusBarContainer,
  StatusContainer,
} from './styled'

export default function HeroStats ({ stat }) {
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
        <StatusTimer name={stat.battleName} character={stat} />
      </CurrentStatsContainer>
    </StatusContainer>
  )
}

HeroStats.propTypes = {
  stat: PropTypes.shape({
    agility: PropTypes.number.isRequired,
    battleName: PropTypes.string.isRequired,
    currentHp: PropTypes.number.isRequired,
    currentMp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    maxMp: PropTypes.number.isRequired,
  }).isRequired,
}
