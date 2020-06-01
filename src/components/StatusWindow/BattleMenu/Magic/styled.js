import styled from 'styled-components'
import {
  black,
  blackTransparent2,
  fontFamily,
  gray,
  white,
  yellowTransparent,
} from '../../../../constants/variables'

export const MagicContainerStyled = styled.div`
  align-items: flex-start;
  background-color: ${blackTransparent2};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  bottom: 40px;
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: flex-start;
  left: 40px;
  min-width: 300px;
  position: absolute;
  overflow: auto;
  text-shadow: 2px 1px #8a8a7b;
  z-index: 1;
`

export const MagicNameStyled = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.warn ? yellowTransparent : white)};
  font-family: ${fontFamily};
  font-size: 22pt;
  margin-bottom: -5px;
  margin-bottom: 4px;
  margin-top: 0px;
  outline: 0;
  padding: 0 0;
  text-shadow: 2px 1px ${(props) => (props.warn ? black : '#8a8a7b')};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  &:hover {
    cursor: pointer;
    color: blue; // just to show what is selected, change to a real color [TODO]
  }
  &:disabled {
    color: ${gray};
    text-shadow: 2px 1px ${black};
    &:hover {
      cursor: default;
    }
  }
`
