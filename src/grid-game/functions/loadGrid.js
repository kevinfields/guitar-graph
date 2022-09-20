const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

export default function loadGrid(size) {

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

        let obstacleRoll = Math.floor(Math.random() * 10) + 1;
        if (obstacleRoll > 9) {
          obstacles++;
        } 
        gridObject[ALPHABET[i]][ALPHABET[j]] = {
          coordinates: `${i}.${j}`,
          currentOccupantId: (obstacleRoll > 9) ? `OBS${obstacles}` : '',
        };
      };
    };
  };
  return gridObject;
}