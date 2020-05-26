export default function updateStats (enemiesVar, heroesVar) {
  return (character) => {
    const enemies = enemiesVar()
    const heroes = heroesVar()
    const foundEnemy = enemies.findIndex(
      ({ battleName }) => battleName === character.battleName
    )

    if (foundEnemy >= 0) {
      const newEnemies = [...enemies]
      newEnemies[foundEnemy] = character
      enemiesVar(newEnemies)
    } else {
      const foundHero = heroes.findIndex(
        ({ battleName }) => battleName === character.battleName
      )
      if (foundHero >= 0) {
        const newHeroes = [...heroes]
        newHeroes[foundEnemy] = character
        heroesVar(newHeroes)
      }
    }
  }
}
