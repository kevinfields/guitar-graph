

export default function makeIdFromTitle(title) {

  const lowercase = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'b', 'v', 'c', 'x', 'z'];
  const uppercase = [...lowercase].join('').toUpperCase().split('');

  let titleArr = title.split('');

  for (let letter of titleArr) {
    if ((!lowercase.includes(letter) && !uppercase.includes(letter)) && !isNaN(letter)) {
      if (letter === ' ') {
        letter = '_';
      } else {
        letter = '-';
      };
    }; 
  };
  return titleArr.join('');
};