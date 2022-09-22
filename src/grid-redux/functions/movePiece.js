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

    
    let newObstacleCoord = getNewCoord(obs.coord, 'S', grid.size);

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

  newGrid[newCoord] = {
    ...grid[newCoord],
    occupant: id,
  };

  return newGrid;
}