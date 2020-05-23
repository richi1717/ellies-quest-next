export default function addCharacter (characterVar) {
  return (enemies, heroes) => {
    enemies.forEach((enemy, idx) => {
      enemy.battleName = `enemy${idx + 1}`
    })
    const characters = [...enemies, ...heroes]

    characterVar(characters)
  }
}
