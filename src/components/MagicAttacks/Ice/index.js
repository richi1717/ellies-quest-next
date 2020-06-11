import styled, { keyframes } from 'styled-components'

const percentage = (number) => `-${number * 23}%`

const move = keyframes`
  0% { transform: translate(0, 23px); opacity: 0.8; }
  2% { transform: translate(-3px, 18px); width: 540% }
  4% { transform: translate(-7px, 13px); width: 580% }
  6% { transform: translate(-11px, 8px); width: 620% }
  8% { transform: translate(-14px, 2px); width: 660% }
  10% { transform: translate(-18px, -1px); width: 700% }
  12% { transform: translate(-22px, -6px); width: 740% }
  14% { transform: translate(-23px, -7px); width: 760%; }
  20% { transform: translate(${percentage(2)}, 23px); width: 500%; }
  30% { transform: translate(${percentage(3)}, -4px); }
  40% { transform: translate(${percentage(0)}, -115px); }
  60% { transform: translate(-22%, -115px); }
  80% { transform: translate(${percentage(2)}, -115px); } */
`

const IceStyled = styled.div`
  animation-name: ${move};
  animation-duration: 3s;
  animation-timing-function: steps(1);
  animation-iteration-count: 1;
  background-image: url(/img/ice.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  opacity: 0;
  height: 220%;
  width: 500%;
  transform: translate(0px, 23px);
`

const ContainerStyled = styled.div`
  margin-top: -20px;
  overflow: hidden;
  position: relative;
  height: 100px;
  width: 100px;
`

const Ice = () => (
  <ContainerStyled>
    <IceStyled />
  </ContainerStyled>
)

export default Ice
