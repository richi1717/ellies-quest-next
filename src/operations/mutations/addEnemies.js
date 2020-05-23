export default function addEnemies (enemiesVar) {
  return (enemies) => {
    enemies.forEach((enemy, idx) => {
      if (!enemy?.battleName) {
        enemy.battleName = `enemy${idx + 1}`
      }
    })
    enemiesVar(enemies)
  }
}
