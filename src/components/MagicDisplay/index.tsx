import { useSoundFX } from '../../hooks'
import type { MagicSpell } from '@/types'
import Cure from './Cure'
import Fire from './Fire'
import Ice from './Ice'
import Lightning from './Lightning'

interface Props {
  type: MagicSpell['type']
}

export default function MagicDisplay({ type }: Props) {
  const { audio } = useSoundFX(`${type}MagicFX`)
  audio?.play()

  if (type === 'cure' || type === 'revive') return <Cure />
  if (type === 'fire') return <Fire />
  if (type === 'ice') return <Ice />
  if (type === 'lightning') return <Lightning />
  return null
}
