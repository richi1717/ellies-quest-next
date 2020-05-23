import styled from 'styled-components'

const enemySprite = {
  'enemy-green-eagle': '0 0',
  'enemy-red-eagle': '-85px 0',
  'enemy-blue-hornet': '-176px 0',
  'enemy-green-hornet': '-275px 0',
  'enemy-flying-yellow-brain': '-375px 0',
  'enemy-flying-red-brain': '-475px 0',
  'enemy-yellow-fish': '-565px 0',
  'enemy-blue-fish': '-650px 0',
  'enemy-green-blob': '-740px 0',
  'enemy-yellow-blob': '-830px 0',
  'enemy-red-blob': '-920px 0',
  'enemy-blue-blob': '-1010px 0',
  'enemy-yellow-antman': '-1105px 0',
  'enemy-green-antman': '-1195px 0',
  'enemy-blue-antman': '-1290px 0',
  'enemy-blue-tapeworm': '-1377px 0',
  'enemy-red-tapeworm': '-1468px 0',
  'enemy-orange-babydemon': '-1560px 0',
  'enemy-red-babydemon': '-1660px 0',
  'enemy-green-babydemon': '-1750px 0',
  'enemy-gray-mouse': '-1840px 0',
  'enemy-gold-mouse': '-1945px 0',
}

const enemyPosition = {
  'enemy1': {
    top: '40%',
    left: '25%',
  },
  'enemy1-movement': {
    top: '32.5%',
  },
  'enemy2': {
    top: '60%',
    left: '25%',
  },
  'enemy2-movement': {
    top: '48.5%',
  },
  'enemy3': {
    top: '50%',
    left: '10%',
  },
  'enemy3-movement': {
    top: '40.5%',
  },
  'enemy4': {
    top: '30%',
    left: '10%',
  },
  'enemy4-movement': {
    top: '25.5%',
  },
  'enemy5': {
    top: '70%',
    left: '10%',
  },
  'enemy5-movement': {
    top: '55.5%',
  },
}

export const EnemyDisplay = styled.div`
  background-image: url('/img/monsters2.png');
  background-size: 2220px;
  position: absolute;
  height: 100px;
  width: 90px;
  background-position: ${(props) => enemySprite[props.classes]};
  z-index: 2;
  ${(props) => enemyPosition[props.id]};
`
