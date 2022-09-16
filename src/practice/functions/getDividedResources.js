export default function getDividedResources(type, totalValue, divideBy) {

  let dividedArray = [];
  let remainder = totalValue;

  for (let i=0; i<divideBy; i++) {
    let randomValue = Math.floor(Math.random() * remainder) + 1;
    dividedArray.push({
      type: type,
      value: randomValue,
      y: Math.floor(Math.random() * 60) + 11,
      x: Math.floor(Math.random() * 60) + 11,
    });
    remainder -= randomValue;
  };
  return dividedArray;
}