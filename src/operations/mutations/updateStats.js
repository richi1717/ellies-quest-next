export default function addCharacters (characterVar) {
  return (character) => {
    const characters = characterVar()
    console.log(characters)
    characters[character.id] = character
    characterVar(characters)
  }
}
