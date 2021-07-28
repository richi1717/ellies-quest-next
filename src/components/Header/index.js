import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { isEmpty } from 'lodash'
import { GET_VICTORY } from '../../operations/queries/getVictory'
import { GET_WHOSE_TURN } from '../../operations/queries/getWhoseTurn'
import { GET_COMBAT_DETAILS } from '../../operations/queries/getCombatDetails'
import { InfoBar } from './styled'
import musicLocation from '../../constants/musicLocation'

export default function Header () {
  const router = useRouter()
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const victoryQuery = useQuery(GET_VICTORY)
  const combatDetailsQuery = useQuery(GET_COMBAT_DETAILS)
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  const victory = victoryQuery?.data?.victory
  const combatDetails = combatDetailsQuery?.data?.combatDetails

  useEffect(() => {
    const bmAudio = document.getElementById('audioNormalBattleMusic')
    if (victory) {
      bmAudio.pause()
      router.push('/battle/victory')
    } else {
      process.env.playAudio && bmAudio.play()
      bmAudio.loop = true
    }
  }, [victory])

  const Text = () => {
    if (!isEmpty(combatDetails)) {
      const { targeter, text } = combatDetails
      return (
        <InfoBar>
          {targeter?.name} {text}
        </InfoBar>
      )
    }
    if (whoseTurn?.name) return <InfoBar>{whoseTurn?.name}'s turn</InfoBar>
    return null
  }

  return (
    <>
      <audio
        src={`/music/${musicLocation.normalBattleMusic}`}
        id="audioNormalBattleMusic"
        loop
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <Text />
    </>
  )
}
