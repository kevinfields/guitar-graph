const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

export default function changeGrid(grid, direction, occupantId) {


  function allowMovement(coords, dir) {

    switch (dir) {
      case 'up':
        if (Number(coords.x) > 0) {
          return true;
        };
        break;
      default:
        break;
    };

    return false;
  }

  let occupantCurrentCoord = {x: '0', y: '0'};

  let gridMaximumCoord = 0;
  let newGrid = {...grid};

  for (const row in grid) {
    gridMaximumCoord++;
    for (const item in grid[row]) {
      if (grid[row][item].currentOccupantId === occupantId) {
        occupantCurrentCoord.x = grid[row][item].coordinates.split('.')[0];
        occupantCurrentCoord.y = grid[row][item].coordinates.split('.')[1];
        console.log('found occupant at coordinates: ' + occupantCurrentCoord.x + '.|.' + occupantCurrentCoord.y);

        if (allowMovement(occupantCurrentCoord, direction)) {
          newGrid[row][item] = {
            ...grid[row][item],
            currentOccupantId: '',
          };
        } else {
          return grid;
        };
      };
    };
  };

  switch (direction) {
    case 'up':
      if (occupantCurrentCoord.x === '0') {
        return grid;
      } else {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x) - 1]][ALPHABET[Number(occupantCurrentCoord.y)]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x) - 1]][ALPHABET[Number(occupantCurrentCoord.y)]],
          currentOccupantId: occupantId,
        };
      };
      break;
    case 'down':
      break;
    case 'left':
      break;
    case 'right':
      break;
    default:
      break;
  };

  console.log('newGrid: ' + JSON.stringify(newGrid));

  return newGrid;
}