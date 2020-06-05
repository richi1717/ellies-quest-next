import React, { memo, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
// import classnames from 'classnames'
import { GET_WHOSE_TURN } from '../../../operations/queries/getWhoseTurn'
import { HeroStyled, TurnStyled } from './styled'
import {
  cureMagicFX,
  fireMagicFX,
  heroAttackFX,
  lightningMagicFX,
} from '../../../helpers/soundEffects'
import DamageDisplay from './DamageDisplay'
import { getCharacterByBattleName } from '../../../operations/queries/getCharacters'
// import Victory from './Victory';
// import setTimeoutHelper from '../helpers/time-out';
// import { damageCalculation, getBaseDamage } from '../helpers/damage-calc';

const Hero = ({ hero, position }) => {
  // console.log({ hero })
  const { battleName, killed } = hero
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)

  const { magicType } = 'attack' // ????
  const [pos2, setPos2] = useState(false)
  // console.log('update', props);

  const setHeroAttackingAnimation = () => {
    setTimeout(() => {
      heroAttackFX()
    }, 800)
  }

  const setHeroMAgicAttackingAnimation = () => {
    setTimeout(() => {
      if (magicType) {
        const type = magicType.name.slice(0, -1).toLowerCase()
        const matchTypeToSound = {
          fire: () => fireMagicFX(),
          lightning: () => lightningMagicFX(),
          cure: () => cureMagicFX(),
        }
        matchTypeToSound[type]()
      }
    }, 800)
  }
  // const handleEnemyAttacking = (heroStats, position) => {
  //   const DMG = getDamageAmount(heroStats.toJS());
  //   const DMG_DISPLAY = document.getElementById('damageDisplayHero' + position);
  //   damageDisplayFadeIn(DMG_DISPLAY, 'damage');
  //   if (DMG > 0) {
  //     console.log(heroStats.toJS());
  //     let newHp = heroStats.toJS().currentHp - DMG;
  //     newHp = newHp <= 0 ? 0 : newHp;
  //     const NEW_STATS = newHp === 0 ? heroStats.set('killed', true).set('currentHp', 0) : heroStats.set('currentHp', newHp);
  //     if (newHp === 0) {
  //       let indexOfDead;
  //       for (const KEY in props.getListOfTurnOrder.toJS()) {
  //         props.getListOfTurnOrder.toJS()[KEY] === 'hero' + position ? indexOfDead = KEY : null;
  //       }
  //       props.removeHeroFromList(indexOfDead);
  //     }
  //     console.log(NEW_STATS.toJS(), position);
  //     props.updateCharacterStats(NEW_STATS.toJS(), position);
  //     console.log('%cdamage: ' + DMG, 'color: red');
  //   }
  // }
  //
  // handleItemUseOnHero(restoration, heroStats, position, type) {
  //   if (type === 'hp') {
  //     restoration = restoration + heroStats.toJS().currentHp >= heroStats.toJS().maxHp ?
  //       heroStats.toJS().maxHp - heroStats.toJS().currentHp : restoration;
  //       if (restoration > 0) {
  //         console.log(heroStats.toJS());
  //         const newHp = heroStats.toJS().currentHp + restoration;
  //         const NEW_STATS = newHp !== 0 ? heroStats.set('currentHp', newHp) : heroStats;
  //         console.log(NEW_STATS.toJS(), position);
  //         props.updateCharacterStats(NEW_STATS.toJS(), position);
  //         console.log('%ccure: ' + restoration, 'color: green');
  //       }
  //   } else if (type === 'mp') {
  //     restoration = restoration + heroStats.toJS().currentMp >= heroStats.toJS().maxMp ?
  //       heroStats.toJS().maxMp - heroStats.toJS().currentMp : restoration;
  //       if (restoration > 0) {
  //         console.log(heroStats.toJS());
  //         const newMp = heroStats.toJS().currentMp + restoration;
  //         const NEW_STATS = newMp !== 0 ? heroStats.set('currentMp', newMp) : heroStats;
  //         console.log(NEW_STATS.toJS(), position);
  //         props.updateCharacterStats(NEW_STATS.toJS(), position);
  //         console.log('%cMP cure: ' + restoration, 'color: green');
  //       }
  //   }
  //   // console.log('%cMP cure: ' + restoration, 'color: red');
  //   damage = restoration;
  //   const DMG_DISPLAY = document.getElementById('damageDisplayHero' + position);
  //   damageDisplayFadeIn(DMG_DISPLAY, 'restore');
  // }
  //
  // const damageDisplayFadeIn = (element, type, display) => {
  //   element.style.opacity = 0;
  //   element.style.display = display || 'block';
  //   type === 'restore' ? (element.style.color = '00FF3C') : element;
  //   // element.style.top = '30%';
  //   let pos = 0;
  //
  //   (function fade() {
  //     let val = parseFloat(element.style.opacity);
  //     if (!((val += 0.01) > 1)) {
  //       element.style.opacity = val;
  //       pos--;
  //       element.style.top = `${pos}px`;
  //       requestAnimationFrame(fade);
  //     } else {
  //       element.style.display = 'none';
  //     }
  //   })();
  // };

  // console.log({ props })
  // const { battleName, position, classes, id, killed } = props
  // console.log(whoseTurn.battleName, 'herhkjekejkle')

  // console.log({ HEROwhoseTurn: whoseTurn })
  // const { target, attacker, typeOfAttack } = whoseTurn
  // const attacking =
  //   target && whoseTurn?.battleName === attackerId && typeOfAttack === 'attack'
  // const attacking = target && attacker === attackerId && typeOfAttack === 'attack'
  // const isHeroUsingMagic =
  //   target && whoseTurn?.battleName === attackerId && typeOfAttack === 'magic'

  // attacking && setHeroAttackingAnimation()
  // isHeroUsingMagic && setHeroMAgicAttackingAnimation()

  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  const attacking = whoseTurn?.battleName === battleName
  const heroInfo = {
    position,
    killed,
    defending: hero.defending,
    attackerId: battleName,
    attacking,
    name: hero.classes,
  }
  return (
    <HeroStyled id={battleName} {...heroInfo}>
      {attacking && <TurnStyled />}
      <DamageDisplay amount={hero.currentHp} isDamage={true} position={position} />
    </HeroStyled>
  )
}

// const shouldNotUpdate = (prevProps, nextProps) => {
//   if (nextProps.isHeroDeadAndNotBeingRevived) return true
//   console.log(prevProps.attackerId, nextProps.attackerId)
//   const { attackerId: prevId, whoseTurn: prevWho } = prevProps
//   const { attackerId: id, whoseTurn: who } = nextProps
//   const isAttacker = id === who.attacker || prevId === prevWho.attacker

//   return !isAttacker || isEqual(prevProps, nextProps)
// }

Hero.propTypes = {
  position: PropTypes.number.isRequired,
  hero: PropTypes.shape({
    accuracy: PropTypes.number.isRequired,
    agility: PropTypes.number.isRequired,
    battleName: PropTypes.string.isRequired,
    classes: PropTypes.string.isRequired,
    currentHp: PropTypes.number.isRequired,
    currentMp: PropTypes.number.isRequired,
    def: PropTypes.number.isRequired,
    defending: PropTypes.bool,
    evade: PropTypes.number.isRequired,
    exp: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    inPlay: PropTypes.bool.isRequired,
    killed: PropTypes.bool.isRequired,
    magic: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    maxMp: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    str: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
}

export default Hero
