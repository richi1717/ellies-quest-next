import styled, { keyframes } from 'styled-components'

const multiplier = (amount) => `-${amount * 115}px`
const setBackgroundPos = (x, y) => `${multiplier(x)} ${multiplier(y)}`

export const HeroStyled = styled.div`
  flex: 0.5;
  z-index: 1;
  transition: top 1s ease, left 1s ease;
  position: absolute;
  background-image: url('/img/battle-sprites2.png');
  background-size: 820px;
  height: 120px;
  width: 120px;
  top: ${({ position }) => {
    const obj = {
      1: '30%',
      2: '70%',
      3: '50%',
    }
    return obj[position]
  }};
  left: ${({ position }) => (position < 3 ? '25%' : '50%')};
  background-position: ${({ name }) => {
    const obj = {
      'red-boy': setBackgroundPos(0, 0),
      'white-girl': setBackgroundPos(0, 1),
      'green-boy': setBackgroundPos(0, 2),
    }
    return obj[name]
  }};
  left: ${(props) => props.attacking && 0};
  background-position-x: ${(props) => props.attacking && multiplier(1)};
  background-position-x: ${(props) => props.killed && multiplier(6)};
  background-position-x: ${(props) => props.defending && !props.attacking && multiplier(3)};
`
const fade = keyframes`
  0% { opacity: 1; }
  25% { opacity: 0.5; }
  50% { opacity: 0; }
  75% { opacity: 0.5; }
  100% { opacity: 1; }
`

export const TurnStyled = styled.div`
  animation: ${fade} 2s linear infinite;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 30px solid rgba(255, 255, 0, 0.8);
  height: 0;
  margin-left: 40%;
  margin-top: -30%;
  width: 0;
`
