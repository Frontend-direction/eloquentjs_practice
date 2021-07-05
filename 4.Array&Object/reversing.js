const reverseArray = (arr) => {
  const newArr = [];

  arr.map(el => newArr.unshift(el))

  return newArr;
};

// const reverseArrayInPlace = (arr) => {
//   for(let i = 1; i < arr.length / 2; i++) {
//     let temp = arr[i-1];
//     arr[i-1] = arr[arr.length-i];
//     arr[arr.length-i] = temp;
//   }
//
//   return arr;
// };

// Second option
const reverseArrayInPlace = (arr) => {
  let n = arr.length;
  for(let i = 0; i < Math.floor(n / 2); i++) {
    let temp = arr[i];
    arr[i] = arr[n-1-i];
    arr[n-1-i] = temp;
  }

  return arr;
};



console.log(reverseArray(["A", "B", "C", "D"]));
console.log(reverseArrayInPlace([1, 2, 3, 4, 5, 6, 7]));