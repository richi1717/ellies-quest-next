import styled, { keyframes } from 'styled-components'

const fadeAndMove = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.1;
    transform: translateY(-60px);
  }
`

export const Damage = styled.div`
  animation-name: ${fadeAndMove};
  animation-duration: 2s;
  animation-iteration-count: 1;
  color: ${(props) => (props.isDamage ? '#ff3300' : 'rgba(45, 179, 77, 0.71)')};
  position: absolute;
  opacity: 0;
  top: 30%;
  left: 50%;
  font-size: 14pt;
  z-index: 1;
`
