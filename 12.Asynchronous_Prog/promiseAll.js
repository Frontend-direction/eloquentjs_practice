function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    const values = [];
    let pending = promises.length;

    if (promises.length === 0){
      return resolve(values);
    }

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then(val => {
          values[i] = val;
          pending = pending - 1;
          if (pending === 0) resolve(values);
        })
        .catch(reject);
    }
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});

Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});

Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error !== "X") {
      console.log("Unexpected failure:", error);
    }
  });

function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
