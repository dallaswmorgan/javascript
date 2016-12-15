let doubler = function(num) {
  return (num * 2);
};
let array = [1,2,3,4,5,6];


Array.prototype.myEach = function(callback) {
  for ( let i = 0; i < this.length; i++ ) {
    callback(this[i]);
  }
};
// array.myEach(hello);


Array.prototype.myMap = function(callback) {
  let outputArray = [];

  this.myEach( function(el) {
    outputArray.push(callback(el));
  });

  return outputArray;
};
// console.log(array.myMap(doubler));


Array.prototype.myInject = function(callback) {
  let dupArray = this.slice();
  let accumulator = dupArray.shift();

  dupArray.myEach( el => {
    accumulator = callback(accumulator, el);
  });

  return accumulator;
};

let fun = function(accum, el) {
  return accum + el;
};
// console.log(array.myInject(fun));
