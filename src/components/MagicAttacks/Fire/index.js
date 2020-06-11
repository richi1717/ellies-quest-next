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
  background-image: url('/img/fire.png');
  background-size: cover;
  opacity: 0;
  height: 100px;
  width: 100px;
  margin-left: ${(props) => (props.move ? -10 : 20)}px;
  animation: ${move} 1.5s linear 2;
`

const Fire = () => <FireStyled />

export default Fire
