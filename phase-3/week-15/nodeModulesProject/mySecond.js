// Q2a: myMultiplier function - returns 3x the parameter
function myMultiplier(num) {
  return num * 3;
}

// Q2b: execute the function, passing 4
// Q2c: save the returned value in a variable and log it
const result = myMultiplier(4);
console.log(result); // 12

// Q2d: export the function
module.exports = myMultiplier;
