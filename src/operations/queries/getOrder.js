import { gql } from '@apollo/client'

export const GET_ORDER = gql`
  query GetOrder {
    order @client
  }
`
