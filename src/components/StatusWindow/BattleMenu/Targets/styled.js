import styled from 'styled-components'
import {
  black,
  blackTransparent2,
  fontFamily,
  white,
  yellowTransparent,
} from '../../../../constants/variables'

export const NameStyled = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.warn ? yellowTransparent : white)};
  font-family: ${fontFamily};
  font-size: 22pt;
  list-style-type: none;
  margin-bottom: -5px;
  margin-bottom: 4px;
  margin-top: 0px;
  outline: 0;
  padding: 0 0;
  text-indent: 10px;
  text-shadow: 2px 1px ${(props) => (props.warn ? black : '#8a8a7b')};
  &:hover {
    cursor: pointer;
    color: blue; // just to show what is selected, change to a real color [TODO]
  }
`
export const TargetsContainerStyled = styled.div`
  align-items: flex-start;
  background-color: ${blackTransparent2};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  bottom: 40px;
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 200px;
  justify-content: flex-start;
  left: 150px;
  left: 40px;
  min-width: ${(props) => (props.moreThanFive ? 600 : 300)}px;
  position: absolute;
  text-shadow: 2px 1px #8a8a7b;
  z-index: 1;
`
