export default function checkWithin(control, obstacle) {

  let px = control.x;
  let pxE = control.x + 5;
  let py = control.y;
  let pyE = control.y + 5;

  let ox = obstacle.x;
  let oxE = obstacle.x + 2.5;
  let oy = obstacle.y;
  let oyE = obstacle.y + 2.5;

  if (px < ox && pxE > oxE) {
    if (py < oy && pyE > oyE) {
      return true;
    }
  };

  return false;
}