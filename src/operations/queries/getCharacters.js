import { gql } from '@apollo/client'
import { charactersVar } from '../../cache'

export const GET_CHARACTERS = gql`
  query GetCharacters {
    heroes @client {
      battleName
      name
    }
    enemies @client {
      battleName
      name
    }
  }
`

export const GET_ENEMIES = gql`
  query GetEnemies {
    enemies @client
  }
`

export const GET_HEROES = gql`
  query GetHeroes {
    heroes @client
  }
`

export const getCharacterByBattleName = (battleName) => {
  return charactersVar().filter((c) => c.battleName === battleName)?.[0]
}
