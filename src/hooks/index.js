import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_RESTARTING_NAME } from '../operations/queries/getRestartingName'
// import { GET_ENEMIES } from '../operations/queries/getCharacters'
import musicLocation from '../constants/musicLocation'

export const useTimer = (timer, character, format) => {
  function timerDisplay () {
    const timerEl = document.getElementById(`${character.battleName}Time`)
    timer
      .onTick(format(timerEl))
      .setAgility(character.agility)
      .start()
  }

  useRestartTimer(character?.battleName, timerDisplay)

  useEffect(() => {
    window.addEventListener('load', timerDisplay)

    return () => {
      timer.stop()
      window.removeEventListener('load', timerDisplay)
    }
  }, [])
}

const useRestartTimer = (battleName, timerDisplay) => {
  const restartQuery = useQuery(GET_RESTARTING_NAME)
  const whoShouldRestartTimer = restartQuery?.data?.whoShouldRestartTimer

  useEffect(() => {
    if (whoShouldRestartTimer === battleName) {
      timerDisplay()
    }
  }, [whoShouldRestartTimer])
}

export const useDelayedEffect = (action, time = 1000, args = []) => {
  useEffect(() => {
    setTimeout(action, time)
  }, [...args])
}

export const useSoundFX = (type) => {
  const audio = process.browser && new window.Audio(`/music/${musicLocation[type]}`)

  return { play: () => audio.play(), audio }
}
