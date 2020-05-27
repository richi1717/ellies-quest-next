import { gql } from '@apollo/client'
import { enemiesVar, heroesVar } from '../../cache'

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

export const getCharacterByBattleName = (battleName) =>
  heroesVar().find((c) => c.battleName === battleName) ||
  enemiesVar().find((c) => c?.battleName === battleName)
