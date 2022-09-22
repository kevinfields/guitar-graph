const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];

export default function getNewCoord(oldCoord, direction, size) {

  let numericalY = ALPHABET.indexOf(oldCoord[0]);
  let numericalX = ALPHABET.indexOf(oldCoord[1]);
  
  switch (direction) {
    case 'W':
      numericalY--;
      break;
    case 'S':
      numericalY++;
      break;
    case 'A':
      numericalX--;
      break;
    case 'D':
      numericalX++;
      break;
    default:
      break;
  };
  
  if (numericalX < 0 || numericalX >= size) {
    return oldCoord;
  };

  if (numericalY < 0 || numericalY >= size) {
    return oldCoord;
  };

  return ALPHABET[numericalY] + ALPHABET[numericalX];
}