import styled, { createGlobalStyle } from 'styled-components'
import { black, blackTransparent, white } from '../constants/variables'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  background-image: url("/img/${(props) => props.battleScene}-battle.png");
  background-size: 50px;
  max-width: 1352px;
  height: 100vh;
  width: 100vw;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
`

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  html {
    font-family: 'Orbitron', sans-serif;
    box-sizing: border-box;
    color: transparent;
    font-size: 10px;
  }
  *, *::before, *::after {
    box-sizing: inherit;
    color: inherit;
    }

  body {
    margin: 0;
    background-color: #212527;
  }
`

export const BattleContainer = styled.div`
  flex: 1;
  height: 500px;
  display: flex;
`

export const InfoBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  color: ${white};
  font-size: 16px;
  text-shadow: 2px 1px ${black};
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  background-color: ${blackTransparent};
  border-radius: 5px;
  z-index: 1;
  margin-right: 3px;
`
