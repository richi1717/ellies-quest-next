import { gql } from '@apollo/client'

export const GET_VICTORY = gql`
  query GetVictory {
    victory @client
  }
`
