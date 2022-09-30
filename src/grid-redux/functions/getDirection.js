//obs and player should be passed in as two character strings giving the coordinates on the grid
//of the player and the obstacle being moved
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];

export default function getDirection(obs, player) {

  let playerY = ALPHABET.indexOf(player[1]);
  let obsY = ALPHABET.indexOf(obs[1]);

  if (playerY < obsY) {
    return 'W';
  } else {
    return 'S';
  }
}