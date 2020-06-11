import PropTypes from 'prop-types'
import CureMagic from './Cure'
import FireMagic from './Fire'
import IceMagic from './Ice'
import LightningMagic from './Lightning'
import { cureMagicFX, fireMagicFX, lightningMagicFX } from '../../helpers/soundEffects'

const MagicDisplay = ({ type }) => {
  if (type === 'cure') {
    cureMagicFX()
    return <CureMagic />
  }
  if (type === 'fire') {
    fireMagicFX()
    return <FireMagic />
  }
  if (type === 'ice') {
    cureMagicFX()
    return <IceMagic />
  }
  if (type === 'lightning') {
    lightningMagicFX()
    return <LightningMagic />
  }

  return null
}

MagicDisplay.propTypes = {
  type: PropTypes.string.isRequired,
}

export default MagicDisplay
