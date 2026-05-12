import styled, { type CSSObject } from '@emotion/styled'
import { keyframes } from '@emotion/react'

const fadeAndMove = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0.1; transform: translateY(-60px); }
`

const Damage = styled.div<{ $isDamage: boolean }>`
  animation: ${fadeAndMove} 2s ease 1;
  color: ${({ $isDamage }) => ($isDamage ? '#ff3300' : 'rgba(45, 179, 77, 0.71)')};
  position: absolute;
  opacity: 0;
  top: 30%;
  left: 50%;
  font-size: 14pt;
  z-index: 1;
`

interface Props {
  amount: number
  isDamage?: boolean
  battleName: string
}

export default function DamageDisplay({ amount, isDamage = true, battleName }: Props) {
  return (
    <Damage id={`damageDisplay${battleName}`} $isDamage={isDamage}>
      {amount}
    </Damage>
  )
}
