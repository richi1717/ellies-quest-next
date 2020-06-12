import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { InfoBar } from './styled'
import { GET_WHOSE_TURN } from '../../operations/queries/getWhoseTurn'
import { GET_ENEMIES } from '../../operations/queries/getCharacters'
import { battleVictoryMusic } from '../../helpers/soundEffects'

export default function Header () {
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const enemiesQuery = useQuery(GET_ENEMIES)
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  const enemies = enemiesQuery?.data?.enemies

  useEffect(() => {
    if (!enemies.length) {
      battleVictoryMusic()
    }
  }, [enemies.length])

  if (!enemies.length) return <InfoBar>You Win!</InfoBar>

  return whoseTurn?.name ? <InfoBar>{whoseTurn?.name}'s turn</InfoBar> : null
}
