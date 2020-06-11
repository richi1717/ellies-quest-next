import { gql } from '@apollo/client'

export const GET_MAGIC_DISPLAY = gql`
  query GetMagicDisplay {
    magicDisplay @client {
      target
      type
    }
  }
`
