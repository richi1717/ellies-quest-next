import styled, { keyframes } from 'styled-components'
import { random } from 'lodash'

const move = keyframes`
  0% { margin-left: 20px; opacity: ${random(0.1, 0.8)}; }
  25% { margin-left: 0px; }
  50% { margin-left: -20px; opacity: ${random(0.1, 0.8)}; }
  75% { margin-left: 0px; }
  100% { margin-left: 20px; opacity: ${random(0.1, 0.8)}; }
`

const FireStyled = styled.div`
  animation: ${move} 1s linear 2;
  background-image: url('/img/fire.png');
  background-size: cover;
  height: 100px;
  margin-left: ${(props) => (props.move ? -10 : 20)}px;
  opacity: 0;
  width: 100px;
`

const Fire = () => <FireStyled />

export default Fire
