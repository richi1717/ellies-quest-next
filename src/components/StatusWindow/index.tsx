import styled from '@emotion/styled'
import { useBattleStore } from '../../store/battleStore'
import HeroStats from './HeroStats'
import Names from './Names'
import BattleMenu from './BattleMenu'
import { black, blackTransparent, fontSize, white } from '../../constants/variables'

const sharedPadding = '0 40px'

const MenuContainer = styled.div`
  display: flex;
  min-height: 26vh;
`

const MenuMainContainer = styled.div`
  align-items: flex-start;
  background-color: ${blackTransparent};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    3px 3px ${black},
    -3px -3px ${black},
    -3px 3px ${black},
    3px -3px ${black};
  color: ${white};
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: ${fontSize};
  justify-content: space-evenly;
  margin-right: 3px;
  padding: ${sharedPadding};
  text-shadow: 2px 1px ${black};
  z-index: 1;
`

const MenuStatsContainer = styled.div`
  background-color: ${blackTransparent};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    3px 3px ${black},
    -3px -3px ${black},
    -3px 3px ${black},
    3px -3px ${black};
  color: ${white};
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: ${fontSize};
  justify-content: space-evenly;
  margin-left: 3px;
  padding: ${sharedPadding};
  text-shadow: 2px 1px ${black};
`

const MenuStatsHeaderContainer = styled.div`
  display: flex;
`

const MenuStatsHeader = styled.div`
  flex: 2;
  &:not(:last-child) {
    padding: 0 70px 0 0;
  }
`

export default function StatusWindow() {
  const heroes = useBattleStore((store) => store.heroes)
  const whoseTurn = useBattleStore((store) => store.whoseTurn)

  return (
    <MenuContainer>
      <MenuMainContainer>
        <div>
          <MenuStatsHeader>NAME</MenuStatsHeader>
        </div>
        {heroes.map((hero) => (
          <Names
            key={hero.name}
            selected={whoseTurn?.battleName === hero.battleName}
            name={hero.name}
          />
        ))}
      </MenuMainContainer>
      <MenuStatsContainer>
        <MenuStatsHeaderContainer>
          <MenuStatsHeader>HP</MenuStatsHeader>
          <MenuStatsHeader>MP</MenuStatsHeader>
          <MenuStatsHeader>TIME</MenuStatsHeader>
        </MenuStatsHeaderContainer>
        {heroes.map((hero) => (
          <HeroStats key={hero.name} stats={hero} />
        ))}
      </MenuStatsContainer>
      {heroes.map(
        (hero) =>
          hero.battleName === whoseTurn?.battleName && (
            <BattleMenu key={hero.battleName} stats={hero} />
          ),
      )}
    </MenuContainer>
  )
}
