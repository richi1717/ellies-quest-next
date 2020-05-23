export const calculateTransform = (curr, max) => {
  const currLength = curr.toString().length;
  const maxLength = max.toString().length;
  const scale = { right: 1, left: 1 };

  if (currLength === 2 && maxLength === 3) {
    scale.right = 1.7;
    scale.left = 1.3;
  }

  return {
    left: {
      transform: `scaleX(${scale.left})`,
      transformOrigin: 'left'
    },
    right: { transform: `scaleX(${scale.right})`, transformOrigin: 'right' }
  };
};

export default calculateTransform;