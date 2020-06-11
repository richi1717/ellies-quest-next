import PropTypes from 'prop-types'
import { useEffect } from 'react'
import CureMagic from './Cure'
import FireMagic from './Fire'
import IceMagic from './Ice'
import LightningMagic from './Lightning'
import { cureMagicFX, fireMagicFX, lightningMagicFX } from '../../helpers/soundEffects'

const MagicAttacks = ({ magicAttack }) => {
  useEffect(() => {
    // reset the magic here!
  }, [])

  if (magicAttack?.type === 'cure') {
    cureMagicFX()
    return <CureMagic />
  }
  if (magicAttack?.type === 'fire') {
    fireMagicFX()
    return <FireMagic />
  }
  if (magicAttack?.type === 'ice') {
    cureMagicFX()
    return <IceMagic />
  }
  if (magicAttack?.type === 'lightning') {
    lightningMagicFX()
    return <LightningMagic />
  }

  return null
}

MagicAttacks.propTypes = {
  magicAttack: PropTypes.shape({ type: PropTypes.string.isRequired }).isRequired,
}

export default MagicAttacks
