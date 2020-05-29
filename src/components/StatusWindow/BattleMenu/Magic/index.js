import { useState } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {
  black,
  blackTransparent2,
  fontFamily,
  gray,
  white,
  yellowTransparent,
} from '../../../../constants/variables'
import Targets from '../Targets'

const BattleMenuMagic = ({ targeter }) => {
  const [typeOfMagic, setTypeOfMagic] = useState('')
  const [typeOfAction, setTypeOfAction] = useState(false)
  // enemies, heroes, targeter (whoIsAttacking kinda), typeOfAction
  const MagicsList = () =>
    targeter.magicAbilities?.map((magic, index) => (
      <MagicNameStyled
        key={magic.name}
        type="button"
        disabled={targeter.currentMp - magic.cost < 0}
        onClick={() => dispatchClickEvent(magic)}
      >
        <span>{magic.name}</span>
        <span>{magic.cost}MP</span>
      </MagicNameStyled>
    ))

  const dispatchClickEvent = (magic) => {
    const name = magic?.name?.toLowerCase()

    if (name.includes('cure')) {
      setTypeOfAction('heal')
    } else if (name.includes('revive')) {
      setTypeOfAction('revive')
    } else {
      setTypeOfAction('magicDamage')
    }
    setTypeOfMagic(magic)
  }

  const isMoreThanFive = () => targeter.magicAbilities.length > 5

  return (
    <MagicContainerStyled moreThanFive={isMoreThanFive()}>
      <MagicsList />
      {typeOfAction && (
        <Targets
          targeter={targeter}
          typeOfAction={typeOfAction}
          typeOfMagic={typeOfMagic}
        />
      )}
    </MagicContainerStyled>
  )
}

const MagicContainerStyled = styled.div`
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

const MagicNameStyled = styled.button`
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

BattleMenuMagic.propTypes = {
  targeter: PropTypes.object.isRequired,
}

export default BattleMenuMagic
