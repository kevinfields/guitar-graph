import getNewCoord from "./getNewCoord";

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];


export default function movePiece(grid, id, direction) {


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
    console.log('failed to find id in grid');
    return grid;
  }

  let newGrid = {...grid};

  newGrid[location] = {
    ...grid[location],
    occupant: '',
  }

  let newCoord = getNewCoord(location, direction, grid.size);

  obstacles.forEach((obs) => {

    const directions = ['W', /* 'A',*/ 'S', /*'D'*/]
    let newObstacleCoord = getNewCoord(obs.coord, directions[Math.floor(Math.random() * 4)], grid.size);
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
  }

  return newGrid;
}