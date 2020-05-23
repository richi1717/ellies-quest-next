// import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import StatusBars from './StatusBars'
import StatusWindowNames from './Names'
import {
  MenuContainer,
  MenuMainContainer,
  MenuStats,
  MenuStatsContainer,
  MenuStatsHeader,
  MenuStatsHeaderContainer,
} from './styled'
import { GET_HEROES } from '../../operations/queries/getCharacters'
import { GET_WHOSE_TURN } from '../../operations/queries/getWhoseTurn'

export default function StatusWindow (props) {
  const { data } = useQuery(GET_HEROES)
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const heroes = data?.heroes
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  // const [time, setTime] = useState(0);
  // useEffect(() => {
  //   timer();
  // }, [time]);
  // const { heroes, whoseTurn } = props
  const renderNames = () =>
    heroes.map((hero) => (
      <StatusWindowNames key={hero.name} whoIsAttacking={whoseTurn} hero={hero} />
    ))

  // const timer = () => {
  //     console.log(time);
  //   const agility = heroes[2] && heroes[2].agility * 7;
  //   console.log(agility);
  //   if (time < 100) {
  //     setTimeout(() => {
  //       setTime(time + 1);
  //     }, calculateSpeed(agility || 1));
  //   }
  // };

  // timer();

  // const renderCurrentAndMax = (curr, max) => {
  //   max = 999;
  //   const style = calculateTransform(curr, max);
  //   return (
  //     <div className="current-and-max-container">
  //       <span style={style.left}>{curr}</span>
  //       <span>/</span>
  //       <span style={style.right}>{max}</span>
  //     </div>
  //   );
  // };

  const showStatusPerCharacter = () =>
    heroes.map((stat) => <StatusBars key={stat.name} stat={stat} />)

  //   const useStatus = () => {
  //     <div className="meter orange nostripes" style="
  //     height: 20px;
  //     width: 300px;
  //     border: 5px solid gray;
  //     position: relative;
  //     margin: 0px 0px 0 40px;
  //     background: white;
  //     -moz-border-radius: 25px;
  //     -webkit-border-radius: 25px;
  //     border-radius: 5px;
  //     padding: 0px;
  // ">
  //       <div
  //         style="width: 100%;display: block;height: 100%;background-color: yellow;background-image: linear-gradient(     center bottom,     rgb(43,194,83) 37%,     rgb(84,240,84) 69%   );box-shadow:      inset 0 2px 9px  rgba(255,255,255,0.3),     inset 0 -2px 6px rgba(0,0,0,0.4);position: relative;overflow: hidden;"></div>
  //     </div>
  //   }

  return (
    <MenuContainer>
      <MenuMainContainer>
        <div>
          <MenuStatsHeader>NAME</MenuStatsHeader>
        </div>
        {renderNames()}
      </MenuMainContainer>
      <MenuStatsContainer>
        <MenuStatsHeaderContainer>
          <MenuStatsHeader>HP</MenuStatsHeader>
          <MenuStatsHeader>MP</MenuStatsHeader>
          <MenuStatsHeader>TIME</MenuStatsHeader>
        </MenuStatsHeaderContainer>
        {showStatusPerCharacter()}
      </MenuStatsContainer>
    </MenuContainer>
  )
}
