import styled from 'styled-components'
import { black, gray, white } from '../../../constants/variables'

export const CharacterNameButton = styled.button`
  padding: 0 0;
  padding-top: 5px;
  text-align: left;
  text-shadow: 2px 1px ${black};
  font-size: 32px;
  color: ${(props) => (props.turn ? gray : white)};
  border: none;
  background: none;
  outline: 0;
  &:focus {
    /* color: green; */
  }
`
