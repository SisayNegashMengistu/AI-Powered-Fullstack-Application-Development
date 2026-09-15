// Q5a: random() function returns a random number
function random() {
  return Math.floor(Math.random() * 100) + 1; // random number from 1-100
}

// Q5b/c: execute it, save in a variable, log it
const value = random();
console.log(value);

// Q5d: export the module
module.exports = random;
