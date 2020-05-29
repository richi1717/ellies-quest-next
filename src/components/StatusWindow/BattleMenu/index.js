import { useState } from 'react'
import { clone } from 'lodash'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { ActionStyled, BattleMenuStyled } from './styled'
import Magic from './Magic'
import Targets from './Targets'
import { characterMutations, orderMutations } from '../../../operations/mutations'

const BattleMenu = ({ stats }) => {
  // console.log('in battle!', stats)
  const [typeOfAction, setTypeOfAction] = useState('')
  const setMenuAction = (selection) => () => {
    setTypeOfAction(selection)
  }

  const attackClick = setMenuAction('damage')
  const magicClick = setMenuAction('magic')
  const itemsClick = setMenuAction('items')

  const defendClick = () => {
    const hero = clone(stats)
    hero.defending = true
    characterMutations.updateHeroStats(hero)
    orderMutations.finishTurn()
  }

  const runClick = setMenuAction('run')

  const BattleMenuAction = ({ onClick, stats, text, disabled }) => (
    <ActionStyled type="button" onClick={() => onClick(stats)} disabled={disabled}>
      {text}
    </ActionStyled>
  )

  BattleMenuAction.propTypes = {
    onClick: PropTypes.func.isRequired,
    stats: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }

  BattleMenuAction.defaultProps = {
    disabled: false,
  }

  return (
    <BattleMenuStyled>
      <BattleMenuAction onClick={attackClick} stats={stats} text="Attack" />
      <BattleMenuAction
        onClick={magicClick}
        stats={stats}
        text="Magic"
        disabled={!stats.magicAbilities}
      />
      <BattleMenuAction onClick={defendClick} stats={stats} text="Defend" />
      <BattleMenuAction onClick={itemsClick} stats={stats} text="Items" />
      <BattleMenuAction onClick={runClick} stats={stats} text="RUN!" />
      {typeOfAction === 'damage' && (
        <Targets typeOfAction={typeOfAction} targeter={stats} />
      )}
      {typeOfAction === 'magic' && <Magic targeter={stats} />}
    </BattleMenuStyled>
  )
}

BattleMenu.propTypes = {
  stats: PropTypes.object.isRequired,
}

export default BattleMenu
