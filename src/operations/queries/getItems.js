import { gql } from '@apollo/client'

export const GET_ITEMS = gql`
  query GetItems {
    items @client
  }
`

export const GET_DROPPED_ITEMS = gql`
  query GetDroppedItems {
    usedItems @client {
      name
      dropFromBattle
      drops
    }
  }
`
