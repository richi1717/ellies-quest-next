import styled, { createGlobalStyle } from 'styled-components'

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
    background-color: #212527;
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

  html, body {
    margin: 0;
  }
`

export const BattleContainer = styled.div`
  flex: 1;
  height: 500px;
  display: flex;
`
