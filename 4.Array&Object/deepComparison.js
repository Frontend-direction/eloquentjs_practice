const deepEqual = (first, second) => {
  if(first === second) {
    return true;
  }

  if(first !== second && typeof first !== 'object' && typeof second !== 'object'){
    return false;
  }

  if(first === null || second === null) {
    return false;
  }

  if(typeof first === typeof second && typeof first === 'object') {
    let firstKeys = Object.keys(first);
    let secondKeys = Object.keys(second);

    if(firstKeys.length === secondKeys.length) {
      for(let i = 0; i <= firstKeys.length - 1; i++) {
        if(second.hasOwnProperty(firstKeys[i])) {
          deepEqual(first[firstKeys[i]], second[firstKeys[i]]);
        } else {
          return false;
        }
      }
    } else {
      return false;
    }

    return true;
  }
};


let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, {herre: {is: "an"}, object: 2}));