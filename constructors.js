function Cat(name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function() {
  return `${this.owner} loves ${this.name}`;
};

let jefferson = new Cat('Jefferson', 'Munyo');
let hobbes = new Cat('Hobbes', 'Calvin');

console.log(jefferson.cuteStatement());
console.log(hobbes.cuteStatement());
Cat.prototype.cuteStatement = function() {
  return `Everyone loves ${this.name}`;
};
console.log(jefferson.cuteStatement());
console.log(hobbes.cuteStatement());

Cat.prototype.meow = function() {
  return `${this.name} says meow!`;
};

console.log(jefferson.meow());
console.log(hobbes.meow());

jefferson.meow = function() {
  return `${this.name} says MEEEE-YOOOWWWWWWWWWWWWW`;
};

console.log(jefferson.meow());
console.log(hobbes.meow());
