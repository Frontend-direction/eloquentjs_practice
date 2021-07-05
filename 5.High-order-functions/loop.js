// const loop = (n, testFn, updateFn, bodyFn) => {
//   let number  = n;
//   for(let i = 0; i < n; i++) {
//     if(!testFn(number)) {
//       return false;
//     }
//
//     bodyFn(number);
//     number = updateFn(number);
//   }
// };

// Book option
function loop(start, test, update, body) {
  for (let value = start; test(value); value = update(value)) {
    body(value);
  }
}

console.log(loop(3, n => n > 0, n => n - 1, console.log));