const fs = require("fs"); // core module needed to write to a file

// Q3a: import both functions from myFirst and mySecond
const myMultiplierFirst = require("./myFirst");
const myMultiplierSecond = require("./mySecond");

// Q3b/c: pass 5 to both imported functions and log the results
console.log("myFirst -> myMultiplier(5):", myMultiplierFirst(5)); // 10
console.log("mySecond -> myMultiplier(5):", myMultiplierSecond(5)); // 15

// Q4a: pass 14 to myFirst's myMultiplier, write the result to results.txt
const resultFromFirst = myMultiplierFirst(14);
const lineOne = `The value of 14 when passed through the myMultiplier function is (${resultFromFirst}).\n`;
fs.writeFileSync("results.txt", lineOne);

// Q4b: pass 14 to mySecond's myMultiplier, append the result on a new line
const resultFromSecond = myMultiplierSecond(14);
const lineTwo = `The value of 14 when passed through the myMultiplier function is (${resultFromSecond}).\n`;
fs.appendFileSync("results.txt", lineTwo);

console.log("Results written to results.txt");
