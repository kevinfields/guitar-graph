// fId => foreign object id => the id of the object moving to the space
// nId => native object id => the id of the object present on the space


export default function getInteraction(nId, fId) {



  let fTag = fId.substring(0, 3);
  let nTag = nId.substring(0, 3);

  console.log('fTag: ' + fTag);
  console.log('nTag: ' + nTag);

  switch (fTag) {
    case 'PLA': 
      if (nTag === 'OBS') {
        return 'col ' + nTag;
      } else if (nTag === 'INV') {
        return `take ${nTag}`;
      };
      break;
    case 'OBS':
      if (nTag === 'OBS') {
        return 'combination';
      } else if (nTag === 'INV') {
        // obstacle moves on to inventory item
      };
      break;
    default:
      break;
  }
  
  return 'none';
}