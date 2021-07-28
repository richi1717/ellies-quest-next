import styled from 'styled-components'
import { black, blackTransparent, white } from '../../constants/variables'

export const ContainerStyled = styled.div`
  align-items: center;
  background-color: ${blackTransparent};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  font-size: 16px;
  height: 100vh;
  text-shadow: 2px 1px ${black};
  width: 100vw;
`

export const CardStyled = styled.div`
  align-items: center;
  background-color: ${blackTransparent};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  font-size: 16px;
  text-shadow: 2px 1px ${black};
`
