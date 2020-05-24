import { useState } from 'react'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { ActionStyled, BattleMenuStyled } from './styled'
import Targets from './Targets'

const BattleMenuTurn = ({ stats }) => {
  // console.log('in battle!', stats)
  // const [action, setAction] = useState('')
  const [showAttack, setShowAttack] = useState(false)
  const setMenuAction = (selection) => (whoseTurn) => {
    setShowAttack(true)
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
      {showAttack && <Targets />}
    </BattleMenuStyled>
  )
}

BattleMenuTurn.propTypes = {
  stats: PropTypes.object.isRequired,
}

export default BattleMenuTurn
