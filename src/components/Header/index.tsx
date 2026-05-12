import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
import styled from '@emotion/styled'
import { useBattleStore } from '../../store/battleStore'
import { black, blackTransparent } from '../../constants/variables'
import musicLocation from '../../constants/musicLocation'

const InfoBar = styled.div`
  align-items: center;
  background-color: ${blackTransparent};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    3px 3px ${black},
    -3px -3px ${black},
    -3px 3px ${black},
    3px -3px ${black};
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  margin-right: 3px;
  padding: 8px;
  position: absolute;
  text-shadow: 2px 1px ${black};
  top: 0;
  width: 100%;
  z-index: 1;
`

export default function Header() {
  const navigate = useNavigate()
  const victory = useBattleStore((store) => store.victory)
  const whoseTurn = useBattleStore((store) => store.whoseTurn)
  const combatDetails = useBattleStore((store) => store.combatDetails)

  // Start music on first user gesture — browsers block autoplay until interaction
  useEffect(() => {
    const audio = document.getElementById('audioNormalBattleMusic') as HTMLAudioElement | null
    const startMusic = () => audio?.play().catch(() => {})
    document.addEventListener('click', startMusic, { once: true })
    document.addEventListener('keydown', startMusic, { once: true })
    return () => {
      document.removeEventListener('click', startMusic)
      document.removeEventListener('keydown', startMusic)
    }
  }, [])

  useEffect(() => {
    const audio = document.getElementById('audioNormalBattleMusic') as HTMLAudioElement | null
    if (victory) {
      audio?.pause()
      navigate('/battle/victory')
    }
  }, [victory, navigate])

  const renderText = () => {
    if (!isEmpty(combatDetails) && combatDetails) {
      return (
        <InfoBar>
          {combatDetails.targeter?.name} {combatDetails.text}
        </InfoBar>
      )
    }
    if (whoseTurn?.name) return <InfoBar>{whoseTurn.name}'s turn</InfoBar>
    return null
  }

  return (
    <>
      <audio src={`/music/${musicLocation.normalBattleMusic}`} id="audioNormalBattleMusic" loop />
      {renderText()}
    </>
  )
}
