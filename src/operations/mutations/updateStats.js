export default function updateStats (enemiesVar, heroesVar) {
  return (character) => {
    const enemies = enemiesVar()
    const heroes = heroesVar()

    const foundEnemy = enemies.findIndex(
      (enemy) => enemy?.battleName === character.battleName
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
        newHeroes[foundHero] = character
        heroesVar(newHeroes)
      }
    }
    return new Promise((resolve) => resolve('done'))
  }
}

export function updateHeroStats (heroesVar) {
  return (character) => {
    const heroes = heroesVar()

    const foundHero = heroes.findIndex(
      ({ battleName }) => battleName === character.battleName
    )

    if (foundHero >= 0) {
      const newHeroes = [...heroes]
      newHeroes[foundHero] = character
      return heroesVar(newHeroes)
    }
  }
}
