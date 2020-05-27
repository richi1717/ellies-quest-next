import styled from 'styled-components'
import { black, blackTransparent, white } from '../../constants/variables'

export const InfoBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  color: ${white};
  font-size: 16px;
  text-shadow: 2px 1px ${black};
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  background-color: ${blackTransparent};
  border-radius: 5px;
  z-index: 1;
  margin-right: 3px;
`
