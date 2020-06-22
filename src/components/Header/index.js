import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { isEmpty } from 'lodash'
import { GET_VICTORY } from '../../operations/queries/getVictory'
import { GET_WHOSE_TURN } from '../../operations/queries/getWhoseTurn'
import { GET_COMBAT_DETAILS } from '../../operations/queries/getCombatDetails'
import { InfoBar } from './styled'
import { useSoundFX } from '../../hooks'
import musicLocation from '../../constants/musicLocation'

export default function Header () {
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const victoryQuery = useQuery(GET_VICTORY)
  const combatDetailsQuery = useQuery(GET_COMBAT_DETAILS)
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  const victory = victoryQuery?.data?.victory
  const combatDetails = combatDetailsQuery?.data?.combatDetails

  const { play: victoryPlay } = useSoundFX('battleVictoryMusic')

  useEffect(() => {
    const bmAudio = document.getElementById('audioNormalBattleMusic')
    if (victory) {
      bmAudio.pause()
      victoryPlay()
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
    if (victory) return <InfoBar>You Win!</InfoBar>
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
