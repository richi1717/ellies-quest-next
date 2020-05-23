import { charactersVar } from './cache'

export const resolvers = {
  Query: {
    characters (_, { battleName }) {
      const filtered = charactersVar().filter(
        (character) => character.battleName === battleName
      )
      console.log({ filtered })
      return []
    },
  },
}
