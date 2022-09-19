export default function indexOfResource(resource, arr) {

  for (let i=0; i<arr.length; i++) {

    if (JSON.stringify(resource) === JSON.stringify(arr[i])) {
      return i;
    };
  };
  
  return -1;
};