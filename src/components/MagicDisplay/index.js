import PropTypes from 'prop-types'
import CureMagic from './Cure'
import FireMagic from './Fire'
import IceMagic from './Ice'
import LightningMagic from './Lightning'
import { useSoundFX } from '../../hooks'

const MagicDisplay = ({ type }) => {
  const { audio } = useSoundFX(`${type}MagicFX`)
  audio.play()

  if (type === 'cure') {
    return <CureMagic />
  }
  if (type === 'fire') {
    return <FireMagic />
  }
  if (type === 'ice') {
    return <IceMagic />
  }
  if (type === 'lightning') {
    return <LightningMagic />
  }

  return null
}

MagicDisplay.propTypes = {
  type: PropTypes.string.isRequired,
}

export default MagicDisplay
