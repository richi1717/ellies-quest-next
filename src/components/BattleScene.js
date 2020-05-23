import React from 'react';
import PropTypes from 'prop-types';
import { normalBattleMusic } from '../helpers/soundEffects';

const BattleScene = ({ playMusic, battleScene, children }) => {
  playMusic && normalBattleMusic();
  return <div className={`${battleScene}-battle battle`}>{children}</div>;
};

BattleScene.defaultProps = {
  battleScene: 'forest',
  playMusic: false
};

BattleScene.propTypes = {
  battleScene: PropTypes.string,
  playMusic: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default BattleScene;
