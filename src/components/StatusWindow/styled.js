import styled from 'styled-components'
import { black, blackTransparent, fontSize, white } from '../../constants/variables'

const sharedPadding = '0 40px'

export const MenuContainer = styled.div`
  display: flex;
  min-height: 26vh;
`

export const MenuMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: ${sharedPadding};
  flex: 1;
  color: ${white};
  font-size: ${fontSize};
  text-shadow: 2px 1px ${black};
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  background-color: ${blackTransparent};
  border-radius: 5px;
  z-index: 1;
`

export const MenuStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: ${sharedPadding};
  flex: 1;
  color: ${white};
  font-size: ${fontSize};
  text-shadow: 2px 1px ${black};
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  background-color: ${blackTransparent};
  border-radius: 5px;
`

export const MenuStats = styled.div`
  display: flex;
  flex-direction: column;
`

export const MenuStatsHeaderContainer = styled.div`
  display: flex;
`

export const MenuStatsHeader = styled.div`
  flex: 2;
  :not(:last-child) {
    padding: 0 70px 0 0;
  }
`
