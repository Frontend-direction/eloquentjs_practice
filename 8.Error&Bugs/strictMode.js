// 'use strict';

// Example 1 don't create variable automatically without let, const
// for(counter = 0; counter < 10; counter++) {
//   console.log('counter', counter);
// }


function Person(name) {
  this.name = name;
}

let ferdinand = Person('Ferdinand');
console.log(ferdinand)