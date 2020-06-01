import { useState } from 'react'
import PropTypes from 'prop-types'
import { MagicContainerStyled, MagicNameStyled } from './styled'
import Targets from '../Targets'

const BattleMenuMagic = ({ targeter }) => {
  const [typeOfMagic, setTypeOfMagic] = useState('')
  const [typeOfAction, setTypeOfAction] = useState(false)
  // enemies, heroes, targeter (whoIsAttacking kinda), typeOfAction
  const MagicsList = () =>
    targeter.magicAbilities?.map((magic, index) => (
      <MagicNameStyled
        key={magic.name}
        type="button"
        disabled={targeter.currentMp - magic.cost < 0}
        onClick={() => dispatchClickEvent(magic)}
      >
        <span>{magic.name}</span>
        <span>{magic.cost}MP</span>
      </MagicNameStyled>
    ))

  const dispatchClickEvent = (magic) => {
    const name = magic?.name?.toLowerCase()

    if (name.includes('cure')) {
      setTypeOfAction('heal')
    } else if (name.includes('revive')) {
      setTypeOfAction('revive')
    } else {
      setTypeOfAction('magicDamage')
    }
    setTypeOfMagic(magic)
  }

  const isMoreThanFive = () => targeter.magicAbilities.length > 5

  return (
    <>
      <MagicContainerStyled moreThanFive={isMoreThanFive()}>
        <MagicsList />
      </MagicContainerStyled>
      {typeOfAction && (
        <Targets
          targeter={targeter}
          typeOfAction={typeOfAction}
          typeOfMagic={typeOfMagic}
          sub
        />
      )}
    </>
  )
}

BattleMenuMagic.propTypes = {
  targeter: PropTypes.object.isRequired,
}

export default BattleMenuMagic
