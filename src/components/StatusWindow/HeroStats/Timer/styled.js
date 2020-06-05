import styled from 'styled-components'
import {
  greenTransparent,
  lightBlueTransparent,
  redTransparent,
  yellowTransparent,
} from '../../../../constants/variables'

export const StatusBarContainer = styled.div`
  background-color: ${redTransparent};
  border-radius: 10px;
  height: 5px;
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
