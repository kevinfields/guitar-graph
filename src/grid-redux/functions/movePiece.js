import getNewCoord from "./getNewCoord";

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];


export default function movePiece(grid, id, direction) {


  let location = 'XX';
  for (const coord in grid) {
    if (grid[coord].occupant === id) {
      location = coord;
      break;
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

  newGrid[newCoord] = {
    ...grid[newCoord],
    occupant: id,
  };

  return newGrid;
}