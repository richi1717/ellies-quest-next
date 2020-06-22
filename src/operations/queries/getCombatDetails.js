import { gql } from '@apollo/client'

export const GET_COMBAT_DETAILS = gql`
  query GetCombatDetails {
    combatDetails @client {
      target
      targeter
      text
      type
    }
  }
`
