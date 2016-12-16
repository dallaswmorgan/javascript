let myUniq = function(array) {
  let uniques = [];
  array.forEach( el => {
    if (uniques.includes(el)) {
      return;
    }
    else {
      uniques.push(el);
    }
  });
  return uniques;
};
// console.log(myUniq([1,2,3,3,3,3,4,5,7]));

let twoSum = function(array) {
  let positions = [];
  for (let i = 0; i < array.length; i++ ) {
    for (let j = i + 1; j < array.length; j++ ) {
      if ( array[i] + array[j] === 0 ) {
        positions.push([i,j]);
      }
    }
  }
  return positions;
};
// console.log(twoSum([-1, 0, 2, -2, 1, 0]));

let myTranspose = function(array) {
  let transposed = [];
  for (let j = 0; j < array[0].length; j++ ) {
    transposed.push([]);
  }
  for (let i = 0; i < array.length; i++ ) {
    for (let j = 0; j < array.length; j++ ) {
      transposed[j].push(array[i][j]);
    }
  }
  return transposed;
};
console.log(myTranspose([[1,2,3],[4,5,6],[7,8,9]]));
