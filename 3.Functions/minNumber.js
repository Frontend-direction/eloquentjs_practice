// Find min number among passed arguments

const minNumber = (a, b) => {
  if(Array.isArray(a)) {
   return a.sort((a, b) => a - b)[0];
  }

  return a > b ? b : a;
};


console.log(minNumber([-1,-5,10,8]));