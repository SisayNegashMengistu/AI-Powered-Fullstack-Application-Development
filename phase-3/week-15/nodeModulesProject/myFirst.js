// Q1a: log a simple text
console.log("My first module");

// Q1c: myMultiplier function - returns 2x the parameter
function myMultiplier(num) {
  return num * 2;
}
// Q1d: execute the function, passing 4
// Q1e: save the returned value in a variable and log it
const result = myMultiplier(4);
console.log(result); // 8

// Q1f: export the function 
module.exports = myMultiplier;
