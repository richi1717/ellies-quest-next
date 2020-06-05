import styled from 'styled-components'
import { black, blackTransparent, white } from '../../constants/variables'

export const InfoBar = styled.div`
  align-items: center;
  background-color: ${blackTransparent};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  font-size: 16px;
  margin-right: 3px;
  padding: 8px;
  position: absolute;
  text-shadow: 2px 1px ${black};
  top: 0;
  width: 100%;
  z-index: 1;
`
