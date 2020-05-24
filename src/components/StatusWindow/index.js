// import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import HeroStats from './HeroStats'
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

export default function StatusWindow () {
  const heroesQuery = useQuery(GET_HEROES)
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const heroes = heroesQuery?.data?.heroes
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn

  const renderNames = () =>
    heroes.map((hero) => (
      <StatusWindowNames key={hero.name} whoIsAttacking={whoseTurn} hero={hero} />
    ))

  const showStatusPerCharacter = () =>
    heroes.map((stat) => <HeroStats key={stat.name} stat={stat} />)

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
