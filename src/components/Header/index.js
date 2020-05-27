import { useQuery } from '@apollo/client'
import { InfoBar } from './styled'
import { GET_WHOSE_TURN } from '../../operations/queries/getWhoseTurn'

export default function Header () {
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn

  return whoseTurn?.name ? <InfoBar>{whoseTurn?.name}'s turn</InfoBar> : null
}
