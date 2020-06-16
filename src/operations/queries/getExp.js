import { gql } from '@apollo/client'

export const GET_EXP_FROM_BATTLE = gql`
  query GetExpFromBattle {
    expFromBattle @client
  }
`
