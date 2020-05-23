import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import useAttack from '../customHooks/useAttack';

const BattleMenuListOfTargets = () => {
  const { attack, magicAttack } = useAttack();
  const {
    battleMenuAction,
    characterStats,
    enemyStats,
    whoIsAttacking,
    magicType
  } = useSelector(state => state);
  const getRenderedListOfCharacters = () => {
    const { selection } = battleMenuAction;
    const heroNames = [];
    const heroClasses = {
      'menu-select': true,
      'attack-character': selection !== 'items'
    };

    characterStats.map(hero => {
      if (!hero.killed || selection === 'items' || selection === 'magic') {
        heroNames.push(
          <li key={hero.attackerId}>
            <button
              type="button"
              onClick={() => dispatchClickEvent(hero.attackerId)}
              className={classnames(heroClasses)}
            >
              {hero.name}
            </button>
          </li>
        );
      }
    });

    return heroNames;
  };

  const getRenderedListOfEnemies = () => {
    const enemyNames = [];

    enemyStats.map(enemy => {
      if (!enemy.killed) {
        enemyNames.push(
          <li key={enemy.attackerId}>
            <button
              type="button"
              onClick={() => dispatchClickEvent(enemy.attackerId)}
              className="menu-select"
            >
              {enemy.name}
            </button>
          </li>
        );
      }
    });

    return enemyNames;
  };

  const dispatchClickEvent = id => {
    const { typeOfAttack } = whoIsAttacking;

    switch (typeOfAttack) {
      case 'magic':
        magicAttack(id);
        break;
      case 'attack':
        attack(id);
        break;
      default:
        break;
    }
  };

  const isMoreThanFive = () => {
    const enemyLength = enemyStats.length;
    const heroLength = characterStats.length;
    return (
      (heroLength === 1 && enemyLength > 4) ||
      (heroLength === 2 && enemyLength > 3) ||
      (heroLength === 3 && enemyLength > 2)
    );
  };

  const { selection } = battleMenuAction;
  const isMagic = selection === 'magic' && magicType;
  const areItemsSelected = selection === 'items';
  const menuAttackClasses = {
    'battle-menu-turn': true,
    'menu-attack': true,
    'sub-menu': true,
    'more-than-five': !!isMoreThanFive(),
    'menu-items-select': areItemsSelected,
    'menu-magic-targets': isMagic
  };

  if (selection && (selection === 'attack' || isMagic)) {
    if (isMoreThanFive()) {
      return (
        <div label="yeah" className={classnames(menuAttackClasses)}>
          <div>
            {areItemsSelected
              ? getRenderedListOfCharacters()
              : getRenderedListOfEnemies()}
          </div>
          <div>
            {areItemsSelected
              ? getRenderedListOfEnemies()
              : getRenderedListOfCharacters()}
          </div>
        </div>
      );
    }

    return (
      <div className={classnames(menuAttackClasses)}>
        <div>
          {areItemsSelected
            ? getRenderedListOfCharacters()
            : getRenderedListOfEnemies()}
          {areItemsSelected
            ? getRenderedListOfEnemies()
            : getRenderedListOfCharacters()}
        </div>
      </div>
    );
  }

  return null;
};

export default BattleMenuListOfTargets;
