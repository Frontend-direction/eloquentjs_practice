let arrays = [[1, 2, 3], [4, 5], [6]];

const flatten = (arrays, result = []) => {
  arrays.forEach(el => {
    if(typeof el === 'object') {
      return flatten(el, result)
    } else {
      result.push(el);
    }
  });

  return result;
};

console.log(flatten(arrays));