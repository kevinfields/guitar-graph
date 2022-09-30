import getDirection from "./getDirection";
import getNewCoord from "./getNewCoord";

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];


export default function movePiece(grid, id, direction, difficulty) {

  let directions = ['S'];

  if (difficulty > 0) {
    directions.push('W');
  };

  if (difficulty === 2) {
    directions.push('A', 'D');
  };


  let obstacles = [];
  let location = 'XX';
  for (const coord in grid) {

    if (coord.toUpperCase() !== coord) {
      continue;
    };

    if (grid[coord].occupant === id) {
      location = coord;
    } else if (grid[coord].occupant.substring(0, 3) ===  'OBS') {
      obstacles.push({
        id: grid[coord].occupant,
        coord: coord,
      });
    };
  };

  if (location === 'XX') {
    return grid;
  };

  if (id === 'PLAYER') {
    if (location[0] === ALPHABET[grid.size - 1]) {
      if (direction === 'S') {
        console.log('nah');
        console.log('location: ' + location);
        return grid;
      };
    };
  };

  let newGrid = {...grid};

  newGrid[location] = {
    ...grid[location],
    occupant: '',
  }

  let newCoord = getNewCoord(location, direction, grid.size);

  if (difficulty < 2) {
    obstacles.forEach((obs) => {

      let newObstacleCoord = getNewCoord(obs.coord, directions[Math.floor(Math.random() * directions.length)], grid.size);
      if (newObstacleCoord !== obs.coord) {
        newGrid[obs.coord] = {
          ...newGrid[obs.coord],
          occupant: '',
        };
        newGrid[newObstacleCoord] = {
          ...newGrid[newObstacleCoord],
          occupant: obs.id,
        };
      };
    });
  } else {

    obstacles.forEach((obs) => {

      let homingDirection = getDirection(obs.coord, newCoord);
      let newObstacleCoord = getNewCoord(obs.coord, homingDirection, grid.size);
      if (newObstacleCoord !== obs.coord) {
        newGrid[obs.coord] = {
          ...newGrid[obs.coord],
          occupant: '',
        };
        newGrid[newObstacleCoord] = {
          ...newGrid[newObstacleCoord],
          occupant: obs.id,
        };
      };
    });
  }

  if (newGrid[newCoord].occupant !== '') {
    newGrid = {
      ...newGrid,
      failed: true,
    }
  } else {
    newGrid[newCoord] = {
      ...grid[newCoord],
      occupant: id,
    };
  };

  if (id === 'PLAYER' && newCoord[0] === 'A') {
    newGrid = {
      ...newGrid,
      passed: true,
    }
  };

  newGrid = {
    ...newGrid,
    moves: grid.moves + 1,
  }
  return newGrid;
}