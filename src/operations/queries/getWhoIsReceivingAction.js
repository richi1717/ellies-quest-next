import { gql } from '@apollo/client'

export const GET_WHO_IS_RECEIVING_ACTION = gql`
  query GetWhoIsReceivingAction {
    whoIsReceivingAction @client {
      target
      amount
      type
    }
  }
`
