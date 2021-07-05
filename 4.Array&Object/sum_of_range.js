const range = (start, end, step = 1) => {
  const arr = [];

  for(let i = start; step >= 1 ? i <= end : i >= end; i += step) {
    arr.push(i);
  }

  return arr;
};

const sum = (arr) => {
  return arr.reduce((sum, prev) => sum + prev);
}


console.log(range(5, 2, -1));