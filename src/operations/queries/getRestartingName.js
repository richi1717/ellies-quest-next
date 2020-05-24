import { gql } from '@apollo/client'

export const GET_RESTARTING_NAME = gql`
  query GetRestarting {
    whoShouldRestartTimer @client
  }
`
