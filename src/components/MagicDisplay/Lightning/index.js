import styled, { keyframes } from 'styled-components'
import { random } from 'lodash'

const strike = () => `margin-left: ${random(-20, 20)}px; opacity: ${random(0.1, 1)};`

const move = keyframes`
  0% { ${strike()} }
  25% { ${strike()} }
  50% { margin-left: 0; opacity: ${random(0.1, 1)}; }
  75% { ${strike()} }
  100% { ${strike()} }
`
const flash = () => `opacity: ${random(0.7, 1)}; filter: brightness(${random(0.5, 1.6)});`

const fade = keyframes`
  0% { ${flash()} }
  50% { ${flash()} }
  100% { ${flash()} }
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
  animation: ${fade} 1s linear 2;
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

const Lightning = () => {
  return (
    <ContainerStyled>
      <CloudStyled />
      <LightningStyled />
    </ContainerStyled>
  )
}

export default Lightning
