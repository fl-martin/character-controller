const directionOffset = (forward, backward, leftward, rightward) => {
  let directionOffset = 0;

  if (forward) {
    if (leftward) {
      directionOffset = Math.PI / 4;
    } else if (rightward) {
      directionOffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (leftward) {
      directionOffset = Math.PI / 4 + Math.PI / 2;
    } else if (rightward) {
      directionOffset = -Math.PI / 4 - Math.PI / 2;
    } else {
      directionOffset = Math.PI;
    }
  } else if (leftward) {
    directionOffset = Math.PI / 2;
  } else if (rightward) {
    directionOffset = -Math.PI / 2;
  }

  return directionOffset;
};

export default directionOffset;
