const arrayToList = (arr) => {
  let list = null;

  for(let i = arr.length-1; i >= 0; i--) {
    list = {value: arr[i], rest: list };
  }

  return list;
};

const listToArray = (list) => {
  const arr = [];

  for (let node = list; node; node = node.rest) {
    arr.push(node.value);
  }

  return arr;
};

const prepend = (num, list) => {
  return { value: num, rest: list }
};

const nth = (list, number, counter = 0) => {
  counter++;

  if(counter === number + 1) {
    return list.value;
  } else if (list.rest === null) {
    return undefined;
  }

   return  nth(list.rest, number, counter);
};

console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

// console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}

// console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
//
// console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]