export default function addEnemies (enemiesVar) {
  return (enemies) => {
    enemies.forEach((enemy, idx) => {
      if (!enemy?.battleName) {
        enemy.battleName = `enemy${idx + 1}`
        enemy.position = idx + 1
        if (process.env.debug) enemy.currentHp = 1
      }
    })
    enemiesVar(enemies)
  }
}
