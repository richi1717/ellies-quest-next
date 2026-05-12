import { useEffect } from 'react'
import musicLocation from '../constants/musicLocation'

export function useDelayedEffect(action: () => void, time = 1000, deps: unknown[] = []) {
  useEffect(() => {
    const id = setTimeout(action, time)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export function useSoundFX(type: string) {
  const audio =
    typeof window !== 'undefined' ? new window.Audio(`/music/${musicLocation[type]}`) : null

  return {
    play: () => audio?.play(),
    audio,
  }
}
