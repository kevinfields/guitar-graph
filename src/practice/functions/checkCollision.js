export default function checkCollision(control, obstacle) {

  let px = control.x;
  let py = control.y;

  let ox = obstacle.x;
  let oy = obstacle.y;

  if (ox - px > 5 && px - ox > 2) {
    if (py - oy > 3 && oy - py > 6) {
      return true;
    } else {
      return false;
    };
  } else {
    return false;
  };
};