export default function addHeroes (heroesVar) {
  return (heroes) => {
    heroesVar(heroes)
  }
}
