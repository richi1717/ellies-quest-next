import styled from 'styled-components'
import {
  black,
  blackTransparent2,
  fontFamily,
  gray,
  white,
} from '../../../constants/variables'

export const ActionStyled = styled.button`
  background: none;
  border: none;
  color: ${white};
  font-family: ${fontFamily};
  font-size: 22pt;
  margin-bottom: -5px;
  margin-bottom: 4px;
  margin-top: 0px;
  padding: 0;
  text-shadow: 2px 1px #8a8a7b;
  outline: 0;
  &:hover {
    cursor: pointer;
    color: blue; // just to show what is selected, change to a real color [TODO]
  }
  &:disabled {
    cursor: default;
    color: ${gray};
    text-shadow: 2px 1px ${black};
    &:hover {
      cursor: default;
    }
  }
`
export const BattleMenuStyled = styled.div`
  align-items: flex-start;
  background-color: ${blackTransparent2};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  bottom: 0;
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  height: 200px;
  left: 150px;
  min-width: 300px;
  padding: 12px;
  position: absolute;
  text-shadow: 2px 1px #8a8a7b;
  z-index: 1;
`
