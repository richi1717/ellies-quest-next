import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { useEffect, useState } from 'react'

const move = keyframes`
  0% { margin-top: -20px; opacity: 1; }
  25% { margin-top: -15px; }
  50% { margin-top: -10px; }
  75% { margin-top: -5px; opacity: 0.6; }
  100% { margin-top: 0px; opacity: 0.4; }
`

const CureStyled = styled.div<{ $secondPosition: boolean }>`
  animation: ${move} 2s linear 1;
  background-image: url('/img/cure.png');
  background-size: 500px;
  opacity: 0;
  height: 80px;
  width: 80px;
  margin-top: -20px;
  background-position-x: ${({ $secondPosition }) => ($secondPosition ? -95 : 0)}px;
  background-position-y: 0px;
`

export default function Cure() {
  const [secondPosition, setSecondPosition] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setSecondPosition(true), 1000)
    return () => clearTimeout(id)
  }, [])

  return <CureStyled $secondPosition={secondPosition} />
}
