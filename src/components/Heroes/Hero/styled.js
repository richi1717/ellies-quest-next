import styled from 'styled-components'

export const HeroStyled = styled.div`
  flex: 0.5;
  position: relative;
  z-index: 1;
  transition: top 1s ease, left 1s ease;
  position: absolute;
  background-image: url('/img/battle-sprites2.png');
  background-size: 700px;
  height: 100px;
  width: 100px;
  top: ${({ position }) => {
    const obj = {
      1: '30%',
      2: '70%',
      3: '50%',
    }
    return obj[position]
  }};
  left: ${({ position }) => (position < 3 ? '25%' : '50%')};
  background-position: ${({ name }) => {
    const obj = {
      'red-boy': '6px 3px',
      'white-girl': '7px -95px',
      'green-boy': '3px -190px',
    }
    return obj[name]
  }};
  left: ${(props) => props.isHeroAttacking && 0};
  background-position-x: ${(props) => props.isHeroAttacking && '-95px'};
`
