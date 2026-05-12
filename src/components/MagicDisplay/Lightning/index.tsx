import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const move = keyframes`
  0% { margin-left: -15px; opacity: 0.5; }
  25% { margin-left: 10px; opacity: 0.9; }
  50% { margin-left: 0; opacity: 0.3; }
  75% { margin-left: 15px; opacity: 0.8; }
  100% { margin-left: -10px; opacity: 0.6; }
`

const flash = keyframes`
  0% { opacity: 0.8; filter: brightness(0.8); }
  50% { opacity: 1; filter: brightness(1.4); }
  100% { opacity: 0.7; filter: brightness(0.6); }
`

const LightningStyled = styled.div`
  animation: ${move} 1s linear 2;
  background-image: url('/img/lightning.png');
  background-size: cover;
  height: 100px;
  margin-left: 20px;
  margin-top: -20px;
  opacity: 0;
  position: absolute;
  width: 80px;
  z-index: -1;
`

const CloudStyled = styled.div`
  animation: ${flash} 1s linear 2;
  background-image: url('/img/dark-cloud.png');
  background-size: cover;
  filter: brightness(0.3);
  height: 50px;
  margin-top: -40px;
  opacity: 0;
  width: 130px;
  z-index: 1;
`

const ContainerStyled = styled.div`
  margin-left: -10px;
`

export default function Lightning() {
  return (
    <ContainerStyled>
      <CloudStyled />
      <LightningStyled />
    </ContainerStyled>
  )
}
