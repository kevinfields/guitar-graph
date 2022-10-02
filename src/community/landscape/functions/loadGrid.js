const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];

export default function loadGrid(size, ...obstacles) {

  let grid = {};
  let usedObstacles = 0;

  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      // iterate over every item in a square grid with length obstacleNum. Name the single grid unit.
      let unitId = ALPHABET[i] + ALPHABET[j];
      // if it's the bottom middle tile, spawn the player here and continue to next iteration
      if (j === Math.floor(size / 2) && i === size - 1) {
        grid[unitId] = {
          coordinates: i.toString() + '.' + j.toString(),
          occupant: 'PLAYER',
        };
        continue;
      }
      // if more obstacles can be loaded, roll for a chance to spawn one here. Update spawn formula later.
      let occupant = '';
      if (usedObstacles < obstacles.length) {
        let obstacleRoll = Math.random();
        if (obstacleRoll <= 0.3) {
          occupant = obstacles[usedObstacles];
          usedObstacles++;
        };
      };
      grid[unitId] = {
        coordinates: i.toString() + '.' + j.toString(),
        occupant: occupant,
      };
    };
  };

  grid = {
    ...grid,
    removedObstacles: [],
    obstacleCount: usedObstacles,
    size: size,
    moves: 0,
  };

  return grid;
};