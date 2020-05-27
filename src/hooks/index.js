import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_RESTARTING_NAME } from '../operations/queries/getRestartingName'

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
