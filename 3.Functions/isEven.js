const isEven = (a) => {
  if(a === 0) {
    return true;
  } else if (a === 1) {
    return false;
  } else {
    return isEven(a - 2);
  }
};

console.log(isEven(-1));