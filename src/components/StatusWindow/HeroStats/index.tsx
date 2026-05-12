import styled from '@emotion/styled'
import Timer from './Timer'
import {
  greenTransparent,
  lightBlueTransparent,
  redTransparent,
} from '../../../constants/variables'
import type { Hero } from '@/types'

const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const CurrentStatsContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== '$low',
})<{ $low: boolean }>`
  flex: 2;
  align-self: flex-end;
  color: ${({ $low }) => ($low ? redTransparent : 'inherit')};
  &:not(:last-child) {
    padding: 0 70px 0 0;
  }
`

const StatusBarContainer = styled.div`
  background-color: ${redTransparent};
  border-radius: 10px;
  height: 5px;
`

const StatusBar = styled('div', {
  shouldForwardProp: (prop) => !['$type', '$width'].includes(prop as string),
})<{ $type: 'hp' | 'mp'; $width: number }>`
  background-color: ${({ $type }) => ($type === 'hp' ? greenTransparent : lightBlueTransparent)};
  border-radius: 10px;
  height: 5px;
  width: ${({ $width }) => $width}%;
`

interface Props {
  stats: Hero
}

export default function HeroStats({ stats }: Props) {
  const hpPercentage = Math.ceil((stats.currentHp / stats.maxHp) * 100)
  const mpPercentage = Math.ceil((stats.currentMp / stats.maxMp) * 100)

  return (
    <StatusContainer>
      <CurrentStatsContainer $low={hpPercentage <= 25}>
        {stats.currentHp}/{stats.maxHp}
        <StatusBarContainer>
          <StatusBar $type="hp" $width={hpPercentage} />
        </StatusBarContainer>
      </CurrentStatsContainer>
      <CurrentStatsContainer $low={mpPercentage <= 25}>
        {stats.currentMp}/{stats.maxMp}
        <StatusBarContainer>
          <StatusBar $type="mp" $width={mpPercentage} />
        </StatusBarContainer>
      </CurrentStatsContainer>
      <CurrentStatsContainer $low={false}>
        <Timer character={stats} />
      </CurrentStatsContainer>
    </StatusContainer>
  )
}
