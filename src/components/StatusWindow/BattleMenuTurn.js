import { useState } from 'react'
import PropTypes from 'prop-types'
// import {
//   setAttackerAndTarget,
//   setBattleMenuAction,
//   updateCharacterStats
// } from '../actions/actionCreators';

const BattleMenuTurn = (props) => {
  const [action, setAction] = useState('')
  // console.log(props)
  const setMenuAction = (selection) => (attacker, target) => {
    // dispatch(
    //   setBattleMenuAction({
    //     selection
    //   })
    // );
    // dispatch(
    //   setAttackerAndTarget({
    //     attacker,
    //     target,
    //     typeOfAttack: selection
    //   })
    // );
  }

  const attackClick = setMenuAction('attack')
  const magicClick = setMenuAction('magic')
  const itemsClick = setMenuAction('items')
  const runClick = setMenuAction('run')

  const { whoIsAttacking, characterStats } = props.state
  const { attacker, target } = whoIsAttacking
  const renderListButton = (clickHandler, menuText, extraClass = '') => (
    <li>
      <button
        type="button"
        onClick={() => clickHandler(attacker, target)}
        className={`menu-select${extraClass}`}
      >
        {menuText}
      </button>
    </li>
  )

  if (attacker.includes('hero')) {
    const heroStats = characterStats[attacker.split('hero')[1] - 1]
    const canUseMagic = heroStats.magicAbilities
    return (
      <div className="battle-menu-turn">
        <div>
          {renderListButton(attackClick, 'Attack')}
          <li>
            <button
              type="button"
              className="menu-select"
              onClick={() => {
                heroStats.defending = true
                dispatch(
                  updateCharacterStats({
                    character: heroStats,
                    id: heroStats.id,
                  })
                )
              }}
            >
              Defend
            </button>
          </li>
          {renderListButton(
            canUseMagic && magicClick,
            'Magic',
            canUseMagic ? '' : ' cannot'
          )}
          {renderListButton(itemsClick, 'Items')}
          {renderListButton(runClick, 'RUN!')}
        </div>
      </div>
    )
  }

  return null
}

BattleMenuTurn.propTypes = {
  state: PropTypes.object.isRequired,
}

export default BattleMenuTurn
