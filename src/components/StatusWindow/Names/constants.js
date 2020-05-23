import { gql } from '@apollo/client'

export const GET_WHOSE_TURN_CHARACTER_NAME = gql`
  query GetWhoseTurnCharacterName {
    whoseTurn @client {
      name
    }
  }
`
