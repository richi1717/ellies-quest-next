import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_VICTORY } from '../../operations/queries/getVictory'
import { GET_WHOSE_TURN } from '../../operations/queries/getWhoseTurn'
import { InfoBar } from './styled'
import { useSoundFX } from '../../hooks'
import musicLocation from '../../constants/musicLocation'

export default function Header () {
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const victoryQuery = useQuery(GET_VICTORY)
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  const victory = victoryQuery?.data?.victory

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
      {whoseTurn?.name && !victory && <InfoBar>{whoseTurn?.name}'s turn</InfoBar>}
      {victory && <InfoBar>You Win!</InfoBar>}
    </>
  )
}
