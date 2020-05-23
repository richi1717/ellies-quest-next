import React, { useState } from 'react';
import {
  setMenuAttackSelected,
  ROOT_URL,
  setListOfItems,
  setItemSelectedBoolean,
  setItemObjectFromSelection
} from '../actions/actionCreators';

import classnames from 'classnames';

const BattleMenuAttack = props => {
  const [done, setDone] = useState(false);

  const setItems = items => {
    const ARR = [];
    for (const KEY in items) {
      if (items[KEY].inStock > 0) {
        props.setListOfItems(fromJS(items[KEY]), KEY);
        ARR.push(items[KEY]);
      }
    }
    return ARR;
  };

  const getRenderedListOfItemsFirstFive = () => {
    const ARR = [];
    for (const KEY in props.getListOfItems) {
      const CLICK = 'handleItem' + KEY + 'Click';
      const ITEM = props.getListOfItems[KEY];
      const PROPS = props;
      /* eslint-disable */
      if (KEY < 5) {
        function CLICK() {
          PROPS.setItemSelectedBoolean(true);
          PROPS.setItemObjectFromSelection(ITEM);
          // console.log(ITEM);
        }
        ARR.push(
          <li key={KEY}>
            <button className="menu-select" onClick={CLICK}>
              {ITEM.name + '  x' + ITEM.inStock}
            </button>
          </li>
        );
      }
      /* eslint-enable */
    }
    return ARR;
  };

  const getRenderedListOfItemsAfterFive = () => {
    const ARR = [];
    for (const KEY in props.getListOfItems) {
      const CLICK = 'handleItem' + KEY + 'Click';
      const ITEM = props.getListOfItems[KEY];
      const PROPS = props;
      /* eslint-disable */
      if (KEY > 4) {
        function CLICK() {
          PROPS.setItemSelectedBoolean(true);
          PROPS.setItemObjectFromSelection(ITEM);
          // console.log(ITEM);
        }
        ARR.push(
          <li key={KEY}>
            <button className="menu-select" onClick={CLICK}>
              {ITEM.name + '  x' + ITEM.inStock}
            </button>
          </li>
        );
      }
      /* eslint-enable */
    }
    return ARR;
  };

  const INLINE_STYLE = {
    display: 'none'
  };
  if (props.isMenuItemsSelected && done) {
    const CLASSES = {
      'battle-menu-turn': true,
      'menu-items': true,
      'sub-menu': true,
      'more-than-five': props.getListOfItems.length > 4 ? true : false
    };
    if (props.getListOfItems.length < 5) {
      return (
        <div className={classnames(CLASSES)}>
          <div>{getRenderedListOfItemsFirstFive()}</div>
        </div>
      );
    } else {
      return (
        <div className={classnames(CLASSES)}>
          <div>{getRenderedListOfItemsFirstFive()}</div>
          <div>{getRenderedListOfItemsAfterFive()}</div>
        </div>
      );
    }
  } else {
    return <span style={INLINE_STYLE} />;
  }
};

export default BattleMenuAttack;
