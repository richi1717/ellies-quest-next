import { useState } from 'react'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { GET_WHOSE_TURN } from '../../../operations/queries/getWhoseTurn'
import {
  black,
  blackTransparent2,
  fontFamily,
  gray,
  white,
} from '../../../constants/variables'

const BattleMenuTurn = ({ stats }) => {
  // console.log('in battle!', stats)
  // const [action, setAction] = useState('')
  const setMenuAction = (selection) => (whoseTurn) => {
    // dispatch(
    //   setBattleMenuAction({
    //     selection
    //   })
    // );
    // dispatch(
    //   setAttackerAndTarget({
    //     whoseTurn,
    //     target,
    //     typeOfAttack: selection
    //   })
    // );
  }

  const attackClick = setMenuAction('attack')
  const magicClick = setMenuAction('magic')
  const itemsClick = setMenuAction('items')
  const defendClick = () => {
    console.log('defended!')
    // set defending
  }
  const runClick = setMenuAction('run')

  const BattleMenuAction = ({ onClick, stats, text, unable }) => (
    <ActionStyled type="button" onClick={() => onClick(stats)} unable={unable}>
      {text}
    </ActionStyled>
  )

  BattleMenuAction.propTypes = {
    onClick: PropTypes.func.isRequired,
    stats: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    unable: PropTypes.bool,
  }

  BattleMenuAction.defaultProps = {
    unable: false,
  }

  return (
    <BattleMenuStyled>
      <BattleMenuAction onClick={attackClick} stats={stats} text="Attack" />
      <BattleMenuAction
        onClick={magicClick}
        stats={stats}
        text="Magic"
        unable={!stats.magicAbilities}
      />
      <BattleMenuAction onClick={defendClick} stats={stats} text="Defend" />
      <BattleMenuAction onClick={itemsClick} stats={stats} text="Items" />
      <BattleMenuAction onClick={runClick} stats={stats} text="RUN!" />
    </BattleMenuStyled>
  )
}

const ActionStyled = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.unable ? gray : white)};
  font-family: ${fontFamily};
  font-size: 22pt;
  margin-bottom: -5px;
  margin-bottom: 4px;
  margin-top: 0px;
  padding: 0 0;
  text-indent: 10px;
  text-shadow: 2px 1px #8a8a7b;
  outline: 0;
  &:hover {
    cursor: pointer;
    color: blue; // just to show what is selected, change to a real color [TODO]
  }
`
const BattleMenuStyled = styled.div`
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
  position: absolute;
  text-shadow: 2px 1px #8a8a7b;
  z-index: 1;
`

BattleMenuTurn.propTypes = {
  stats: PropTypes.object.isRequired,
}

export default BattleMenuTurn
