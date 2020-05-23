import { gql } from '@apollo/client'

export const GET_WHOSE_TURN = gql`
  query GetWhoseTurn {
    whoseTurn @client
  }
`
