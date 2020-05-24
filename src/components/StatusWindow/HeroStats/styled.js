import styled from 'styled-components'
import {
  greenTransparent,
  lightBlueTransparent,
  redTransparent,
  yellowTransparent,
} from '../../../constants/variables'

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const CurrentStatsContainer = styled.div`
  flex: 2;
  align-self: flex-end;
  color: ${(props) => (props['data-low'] ? redTransparent : 'inherit')};

  &:not(:last-child) {
    padding: 0 70px 0 0;
  }
`

export const StatusBarContainer = styled.div`
  height: 5px;
  background-color: ${redTransparent};
`

export const StatusBar = styled.div`
  background-color: ${(props) => {
    const obj = { hp: greenTransparent, mp: lightBlueTransparent, time: yellowTransparent }
    return obj[props.type]
  }};
  border-radius: 10px;
  height: 5px;
  width: ${(props) => props.width}%;
`
