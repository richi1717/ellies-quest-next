import PropTypes from 'prop-types'
import Timer from './Timer'
import {
  CurrentStatsContainer,
  StatusBar,
  StatusBarContainer,
  StatusContainer,
} from './styled'

export default function HeroStats ({ stats }) {
  const hpPercentage = Math.ceil((stats.currentHp / stats.maxHp) * 100)
  const mpPercentage = Math.ceil((stats.currentMp / stats.maxMp) * 100)

  return (
    <StatusContainer>
      <CurrentStatsContainer data-low={hpPercentage <= 95}>
        {stats.currentHp}/{stats.maxHp}
        <StatusBarContainer>
          <StatusBar type="hp" width={hpPercentage} />
        </StatusBarContainer>
      </CurrentStatsContainer>
      <CurrentStatsContainer data-low={mpPercentage <= 25}>
        {stats.currentMp}/{stats.maxMp}
        <StatusBarContainer>
          <StatusBar type="mp" width={mpPercentage} />
        </StatusBarContainer>
      </CurrentStatsContainer>
      <CurrentStatsContainer>
        <Timer name={stats.battleName} character={stats} />
      </CurrentStatsContainer>
    </StatusContainer>
  )
}

HeroStats.propTypes = {
  stats: PropTypes.shape({
    agility: PropTypes.number.isRequired,
    battleName: PropTypes.string.isRequired,
    currentHp: PropTypes.number.isRequired,
    currentMp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    maxMp: PropTypes.number.isRequired,
  }).isRequired,
}
