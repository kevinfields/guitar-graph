const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

export default function loadGrid(size, obstacleNum) {

  if (isNaN(obstacleNum) || obstacleNum <= 0) {
    obstacleNum = 1;
  }

  let gridObject = {};
  let obstacles = 0;
  let middle = Math.floor(size / 2);

  for (let i=0; i<size; i++) {

    gridObject[ALPHABET[i]] = {};

    for (let j=0; j<size; j++) {
      if (i === (middle) && j === (middle)) {
        gridObject[ALPHABET[i]][ALPHABET[j]] = {
          coordinates: `${middle}.${middle}`,
          currentOccupantId: 'PLAYER',
        }
      } else {

        let obstacleRoll;
        if (obstacles < obstacleNum) {
          obstacleRoll = Math.floor(Math.random() * (size * size)) + 1;
        } else {
          obstacleRoll = -1;
        };

        if (obstacleRoll > obstacleNum) {
          obstacles++;
        };

        gridObject[ALPHABET[i]][ALPHABET[j]] = {
          coordinates: `${i}.${j}`,
          currentOccupantId: (obstacleRoll > obstacleNum) ? `OBS${obstacles}` : '',
        };
      };
    };
  };

  gridObject = {
    ...gridObject,
    obstacles: obstacles,
    removedObstacles: [],
  };

  return gridObject;
}