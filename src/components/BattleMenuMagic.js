import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dispatch from '../dispatch';
import { setMagicType } from '../actions/actionCreators';

const BattleMenuMagic = props => {
  const { characterStats, whoIsAttacking } = props.state;
  const getRenderedListOfMagicFirstFive = magic => {
    const arr = [];
    let incr = 0;

    magic.map((mgk, id) => {
      incr++;

      if (id < 5) {
        arr.push(
          <li key={incr}>
            <button
              type="button"
              className="menu-select magic-menu"
              onClick={() => dispatchClickEvent(mgk)}
            >
              <span>{mgk.name}</span>
              <span>{mgk.cost}MP</span>
            </button>
          </li>
        );
      }
    });

    return arr;
  };

  const getRenderedListOfItemsAfterFive = magic => {
    const arr = [];
    let incr = 0;

    magic.map((mgk, id) => {
      incr++;

      if (id > 4) {
        arr.push(
          <li key={incr}>
            <button
              type="button"
              className="menu-select magic-menu"
              onClick={() => dispatchClickEvent(mgk)}
            >
              <span>{mgk.name}</span>
              <span>{mgk.cost}MP</span>
            </button>
          </li>
        );
      }
    });

    return arr;
  };

  const dispatchClickEvent = magic => {
    dispatch(
      setMagicType({
        magicType: magic
      })
    );
  };

  if (whoIsAttacking.typeOfAttack !== 'magic') return null;
  const hero = characterStats[whoIsAttacking.attacker.split('hero')[1] - 1];
  const CLASSES = {
    'battle-menu-turn': true,
    'menu-magic': true,
    'sub-menu': true,
    'more-than-five': hero.magicAbilities.length > 4
  };

  if (hero.magicAbilities.length < 5) {
    return (
      <div className={classnames(CLASSES)}>
        <div>{getRenderedListOfMagicFirstFive(hero.magicAbilities)}</div>
      </div>
    );
  }

  return (
    <div className={classnames(CLASSES)}>
      <div>{getRenderedListOfMagicFirstFive(hero.magicAbilities)}</div>
      <div>{getRenderedListOfItemsAfterFive(hero.magicAbilities)}</div>
    </div>
  );
};

BattleMenuMagic.propTypes = {
  state: PropTypes.object.isRequired
};

export default BattleMenuMagic;
