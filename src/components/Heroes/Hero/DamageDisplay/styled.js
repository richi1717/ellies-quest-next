import styled from 'styled-components'

export const Damage = styled.div`
  color: ${(props) => (props.isDamage ? '#ff3300' : 'rgba(45, 179, 77, 0.71)')};
  position: absolute;
  top: 30%;
  left: 50%;
  font-size: 13pt;
  z-index: 1;
`
