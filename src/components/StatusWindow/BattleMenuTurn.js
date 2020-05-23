import { useState } from 'react'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { GET_WHOSE_TURN } from '../../operations/queries/getWhoseTurn'
// import {
//   setAttackerAndTarget,
//   setBattleMenuAction,
//   updateCharacterStats
// } from '../actions/actionCreators';

const BattleMenuTurn = (props) => {
  const [action, setAction] = useState('')
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  // console.log(props)
  const setMenuAction = (selection) => (whoseTurn, target) => {
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
  const runClick = setMenuAction('run')

  const { characterStats } = props.state
  const { target } = whoseTurn
  const renderListButton = (clickHandler, menuText, extraClass = '') => (
    <li>
      <button
        type="button"
        onClick={() => clickHandler(whoseTurn, target)}
        className={`menu-select${extraClass}`}
      >
        {menuText}
      </button>
    </li>
  )

  if (whoseTurn.includes('hero')) {
    const heroStats = characterStats[whoseTurn.split('hero')[1] - 1]
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
