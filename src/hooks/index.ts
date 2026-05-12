import { useEffect } from 'react'
import { useBattleStore } from '../store/battleStore'
import musicLocation from '../constants/musicLocation'
import type { Character } from '@/types'
import CountDownTimer from '../helpers/CountDownTimer'

export function useTimer(
  timer: CountDownTimer,
  character: Character,
  format: (el: HTMLElement | null) => (diff: number) => void
) {
  const whoShouldRestartTimer = useBattleStore((s) => s.whoShouldRestartTimer)

  function timerDisplay() {
    const timerEl = document.getElementById(`${character.battleName}Time`)
    timer.onTick(format(timerEl)).setAgility(character.agility).start()
  }

  useEffect(() => {
    if (whoShouldRestartTimer === character.battleName) {
      timerDisplay()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whoShouldRestartTimer])

  useEffect(() => {
    window.addEventListener('load', timerDisplay)
    return () => {
      timer.stop()
      window.removeEventListener('load', timerDisplay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useDelayedEffect(
  action: () => void,
  time = 1000,
  deps: unknown[] = []
) {
  useEffect(() => {
    const id = setTimeout(action, time)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export function useSoundFX(type: string) {
  const audio = typeof window !== 'undefined'
    ? new window.Audio(`/music/${musicLocation[type]}`)
    : null

  return {
    play: () => audio?.play(),
    audio,
  }
}
