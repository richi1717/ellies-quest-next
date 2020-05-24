import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import useAttack from '../../../../customHooks/useAttack'
import { GET_CHARACTERS } from '../../../../operations/queries/getCharacters'
import { black, blackTransparent2, white } from '../../../../constants/variables'

const Targets = () => {
  const getCharactersQuery = useQuery(GET_CHARACTERS)
  const { enemies, heroes } = getCharactersQuery?.data
  // const { attack, magicAttack } = useAttack()
  const areItemsSelected = false
  const NamesOfHeroes = () => {
    // const { selection } = battleMenuAction;
    // const heroNames = []
    // const heroClasses = {
    //   'menu-select': true,
    //   'attack-character': false,
    // }

    return heroes.map((hero) => {
      // if (!hero.killed || selection === 'items' || selection === 'magic') {
      if (!hero.killed) {
        return (
          <li key={hero.battleName}>
            <button
              type="button"
              onClick={() => {
                console.log(hero)
              }}
              // className={classnames(heroClasses)}
            >
              {hero.name}
            </button>
          </li>
        )
      }
      return null
    })
  }

  const NamesOfEnemies = () => {
    // const enemyNames = []

    return enemies.map((enemy) => {
      if (!enemy.killed) {
        return (
          <li key={enemy.battleName}>
            <button
              type="button"
              onClick={() => {
                console.log(enemy)
              }}
              className="menu-select"
            >
              {enemy.name}
            </button>
          </li>
        )
      }
      return null
    })
  }

  // const dispatchClickEvent = (id) => {
  //   const { typeOfAttack } = whoIsAttacking

  //   switch (typeOfAttack) {
  //     case 'magic':
  //       magicAttack(id)
  //       break
  //     case 'attack':
  //       attack(id)
  //       break
  //     default:
  //       break
  //   }
  // }

  // const isMoreThanFive = () => {
  //   const enemyLength = enemyStats.length
  //   const heroLength = characterStats.length
  //   return (
  //     (heroLength === 1 && enemyLength > 4) ||
  //     (heroLength === 2 && enemyLength > 3) ||
  //     (heroLength === 3 && enemyLength > 2)
  //   )
  // }

  // const { selection } = battleMenuAction
  // const isMagic = selection === 'magic' && magicType
  // const areItemsSelected = selection === 'items'
  // const menuAttackClasses = {
  //   'battle-menu-turn': true,
  //   'menu-attack': true,
  //   'sub-menu': true,
  //   'more-than-five': !!isMoreThanFive(),
  //   'menu-items-select': areItemsSelected,
  //   'menu-magic-targets': isMagic,
  // }

  // if (selection && (selection === 'attack' || isMagic)) {
  //   if (isMoreThanFive()) {
  //     return (
  //       <div label="yeah" className={classnames(menuAttackClasses)}>
  //         <div>
  //           {areItemsSelected ? NamesOfHeroes() : NamesOfEnemies()}
  //         </div>
  //         <div>
  //           {areItemsSelected ? NamesOfEnemies() : NamesOfHeroes()}
  //         </div>
  //       </div>
  //     )
  //   }

  return (
    <TargetsContainerStyled>
      <div>
        {areItemsSelected ? <NamesOfHeroes /> : <NamesOfEnemies />}
        {areItemsSelected ? <NamesOfEnemies /> : <NamesOfHeroes />}
      </div>
    </TargetsContainerStyled>
  )
  // }

  // return null
}
const TargetsContainerStyled = styled.div`
  background-color: ${blackTransparent2};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  bottom: 40px;
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: row;
  height: 200px;
  left: 150px;
  left: 40px;
  min-width: 300px;
  position: absolute;
  text-shadow: 2px 1px #8a8a7b;
  z-index: 1;
`

export default Targets
