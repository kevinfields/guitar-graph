import getInteraction from "./getInteraction";

const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

export default function changeGrid(grid, direction, occupantId, gridLength) {

  


  function allowMovement(coords, dir) {

    switch (dir) {
      case 'up':
        if (Number(coords.x) > 0) {
          return true;
        };
        break;
      case 'down':
        if (Number(coords.x) < gridLength - 1) {
          return true;
        };
        break;
      case 'left':
        if (Number(coords.y) > 0) {
          return true;
        };
        break;
      case 'right':
        if (Number(coords.y) < gridLength - 1) {
          return true;
        };
        break;
      default:
        break;
    };

    return false;
  }

  let occupantCurrentCoord = {x: '0', y: '0'};
  let newGrid = {...grid};
  let removedObstacles = [];

  for (const row in grid) {
    for (const item in grid[row]) {
      if (grid[row][item].currentOccupantId === occupantId) {
        occupantCurrentCoord.x = grid[row][item].coordinates.split('.')[0];
        occupantCurrentCoord.y = grid[row][item].coordinates.split('.')[1];
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

  let newTile;
  let result;
  switch (direction) {
    case 'up':
      newTile = newGrid[ALPHABET[Number(occupantCurrentCoord.x) - 1]][ALPHABET[Number(occupantCurrentCoord.y)]];
      result = getInteraction(newTile.currentOccupantId, occupantId);

      if (result === 'none') {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x) - 1]][ALPHABET[Number(occupantCurrentCoord.y)]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x) - 1]][ALPHABET[Number(occupantCurrentCoord.y)]],
          currentOccupantId: occupantId,
        };
      } else if (result.substring(0, 3) === 'col') {
        return {empty: true};
      } else if (result.substring(0, 3) === 'com') {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x) - 1]][ALPHABET[Number(occupantCurrentCoord.y)]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x) - 1]][ALPHABET[Number(occupantCurrentCoord.y)]],
          currentOccupantId: occupantId,
        };
        removedObstacles.push(newTile.currentOccupantId); 
      } else {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) - 1]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) - 1]],
          currentOccupantId: newTile.currentOccupantId,
        };
      };
      break;
    case 'down':
      newTile = newGrid[ALPHABET[Number(occupantCurrentCoord.x) + 1]][ALPHABET[Number(occupantCurrentCoord.y)]];
      result = getInteraction(newTile.currentOccupantId, occupantId);
      if (result === 'none') {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x) + 1]][ALPHABET[Number(occupantCurrentCoord.y)]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x) + 1]][ALPHABET[Number(occupantCurrentCoord.y)]],
          currentOccupantId: occupantId,
        };
      } else if (result.substring(0, 3) === 'col') {
        return {empty: true};
      } else if (result.substring(0, 3) === 'com') {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x) + 1]][ALPHABET[Number(occupantCurrentCoord.y)]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x) + 1]][ALPHABET[Number(occupantCurrentCoord.y)]],
          currentOccupantId: occupantId,
        };
        removedObstacles.push(newTile.currentOccupantId);
      } else {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x) + 1]][ALPHABET[Number(occupantCurrentCoord.y) - 1]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x) + 1]][ALPHABET[Number(occupantCurrentCoord.y) - 1]],
          currentOccupantId: newTile.currentOccupantId,
        };
      }
      break;
    case 'left':
      newTile = newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) - 1]];
      result = getInteraction(newTile.currentOccupantId, occupantId);
      if (result === 'none') {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) - 1]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) - 1]],
          currentOccupantId: occupantId,
        };
      } else if (result.substring(0, 3) === 'col') {
        return {empty: true};
      } else if (result.substring(0, 3) === 'com') {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) - 1]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) - 1]],
          currentOccupantId: occupantId,
        };
        removedObstacles.push(newTile.currentOccupantId);
      } else {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) - 1]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) - 1]],
          currentOccupantId: newTile.currentOccupantId,
        };
      }
      break;
    case 'right':
      newTile = newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) + 1]];
      result = getInteraction(newTile.currentOccupantId, occupantId);
      if (result === 'none') {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) + 1]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) + 1]],
          currentOccupantId: occupantId,
        };
      } else if (result.substring(0, 3) === 'col') {
        return {empty: true};
      } else if (result.substring(0, 3) === 'com') {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) + 1]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) + 1]],
          currentOccupantId: occupantId,
        };
        removedObstacles.push(newTile.currentOccupantId);
      } else {
        newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) + 1]] = {
          ...newGrid[ALPHABET[Number(occupantCurrentCoord.x)]][ALPHABET[Number(occupantCurrentCoord.y) + 1]],
          currentOccupantId: newTile.currentOccupantId,
        };
      }
      break;
    default:
      break;
  };

  newGrid = {
    ...newGrid,
    removedObstacles: newGrid.removedObstacles.concat(removedObstacles),
  };

  console.log(JSON.stringify(newGrid));
  return newGrid;
}