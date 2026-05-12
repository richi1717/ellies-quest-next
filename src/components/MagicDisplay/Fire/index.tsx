import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const move = keyframes`
  0% { margin-left: 20px; opacity: 0.6; }
  25% { margin-left: 0px; }
  50% { margin-left: -20px; opacity: 0.4; }
  75% { margin-left: 0px; }
  100% { margin-left: 20px; opacity: 0.7; }
`

const FireStyled = styled.div`
  animation: ${move} 1s linear 2;
  background-image: url('/img/fire.png');
  background-size: cover;
  height: 100px;
  margin-left: 20px;
  opacity: 0;
  width: 100px;
`

export default function Fire() {
  return <FireStyled />
}
