import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ENEMIES } from '../../operations/queries/getCharacters'
import { GET_WHOSE_TURN } from '../../operations/queries/getWhoseTurn'
import { InfoBar } from './styled'
import { useSoundFX } from '../../hooks'
import musicLocation from '../../constants/musicLocation'

export default function Header () {
  const whoseTurnQuery = useQuery(GET_WHOSE_TURN)
  const enemiesQuery = useQuery(GET_ENEMIES)
  const whoseTurn = whoseTurnQuery?.data?.whoseTurn
  const enemies = enemiesQuery?.data?.enemies

  const { play: victoryPlay } = useSoundFX('battleVictoryMusic')

  useEffect(() => {
    const bmAudio = document.getElementById('audioNormalBattleMusic')
    if (enemies.length === 0) {
      bmAudio.pause()
      victoryPlay()
    } else {
      process.env.playAudio && bmAudio.play()
      bmAudio.loop = true
    }
  }, [enemies.length === 0])

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
      {whoseTurn?.name && enemies.length && <InfoBar>{whoseTurn?.name}'s turn</InfoBar>}
      {!enemies.length && <InfoBar>You Win!</InfoBar>}
    </>
  )
}
