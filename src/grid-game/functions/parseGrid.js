export default function parseGrid(gridObj) {
  let rowCatcher = [];

  for (const row in gridObj) {
    let tileCatcher = [];
    for (const tile in gridObj[row]) {
      tileCatcher.push(gridObj[row][tile]);
    };
    rowCatcher.push(tileCatcher);
  };
  
  return rowCatcher;
}