Array.prototype.bubbleSort = function() {
  let unsolved = true;
  while (unsolved) {
    unsolved = false;
    for ( let i = 0; i < this.length; i++ ) {
      if ( this[i] < this[i+1] ) {
        this.swapPositions(i, i+1);
        unsolved = true;
      }
    }
  }
  return this;
};

Array.prototype.swapPositions = function(i ,j) {
  let dupArray = this.slice();
  this[i] = dupArray[j];
  this[j] = dupArray[i];
};

let array = [5,2,8,3,9,1,1,4];
// console.log(array.bubbleSort());



String.prototype.substrings = function() {
  let strings = [];

  for (let i = 0; i <= this.length; i++) {
    for (let j = i; j <= this.length; j++) {

      if (strings.includes(this.slice(i, j)) || (this.slice(i, j)) === "") {
        continue;
      }
      else {
        strings.push(this.slice(i, j));
      }
    }
  }
  return strings;
};

let string = "cat";
// console.log(string.substrings());

let range = function(start, end) {
  if (end < start) {
    return [];
  }
  else if (end === start) {
    return [end];
  }
  else {
    let output = [start];
    output = output.concat(range(start + 1, end));
    return output;
  }
};
// console.log(range(2,6));

Array.prototype.sum = function() {
  let sum = 0;
  this.forEach( el => {
    sum += el;
  });
  return sum;
};
array = [1,2,3,4,5];
// console.log(array.sum());

Array.prototype.recSum = function() {
  if (this.length <= 1) {
    return this[0];
  }
  else {
    let sum = this.shift();
    sum += this.recSum();
    return sum;
  }
};
// console.log(array.recSum());

let exp = function(b, n) {
  if (n < 0) {
    return null;
  }
  else if (n === 0) {
    return 1;
  }
  else {
    let result = b;
    result *= exp(result, n-1);
    return result;
  }
};
// console.log(exp(2,3));

let exp2 = function(b, n) {
  if (n < 0) {
    return null;
  }
  else if (n === 0) {
    return 1;
  }
  else if (n === 1) {
    return b;
  }
  else if (n % 2 === 0) {
    let result = exp2(b, n / 2) * exp2(b, n / 2);
    return result;
  }
  else {
    let result = b * (exp2(b, (n - 1) / 2) * exp2(b, (n - 1) / 2) );
    return result;
  }
};
// console.log(exp2(2,2));


let fibonacci = function(n) {
  if (n === 1) {
    return [0];
  }
  else if (n === 2) {
    return [0, 1];
  }
  else {
    let result = fibonacci(n -1);
    result.push(result[result.length - 2] + result[result.length - 1]);
    return result;
  }
};

// console.log(fibonacci(12000));


let binarySearch = function(array, target) {
  if (array.length === 1 && array[0] !== target){
    return null;
  }
  else if (array.length === 1 && array[0] === target) {
    return 0;
  }
  else {
    let pivot = Math.round(array.length / 2);
    if (target <= array[pivot]) {
      return binarySearch(array.splice(0, pivot), target);
    }
    else {
      return pivot + 1 + binarySearch(array.splice(pivot, array.length), target);
    }
  }
};
array = [1, 3, 6, 17, 345, 567];
// console.log(binarySearch(array, 0));


let makeChange = function(val, coins) {
  coins = coins.bubbleSort();
  coins = coins.filter(function(x) { return x <= val; });
  if (coins.includes(val)) {
    return [val];
  }
  else {
    let bestCombo = [coins[0]];
    bestCombo = bestCombo.concat(makeChange(val - coins[0], coins));
    return bestCombo;
  }
};
// let coins = [1,5,10,25];
// console.log(makeChange(398, coins));


let makeBetterChange = function(val, coins) {
  coins = coins.bubbleSort();
  coins = coins.filter(function(x) { return x <= val; });
  if (coins.includes(val)) {
    return [val];
  }
  else {
    let bestCombo = null;
    coins.forEach(coin => {
      let currentCombo = [coin];
      currentCombo = currentCombo.concat(makeBetterChange(val-coin, coins));
      if (bestCombo === null || currentCombo.length < bestCombo.length) {
        bestCombo = currentCombo;
      }
    });
    return bestCombo;
  }
};
let coins = [1,7,10, 25];
console.log(makeBetterChange(37, coins));
