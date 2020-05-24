import styled from 'styled-components'
import {
  greenTransparent,
  lightBlueTransparent,
  redTransparent,
  yellowTransparent,
} from '../../../constants/variables'

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
