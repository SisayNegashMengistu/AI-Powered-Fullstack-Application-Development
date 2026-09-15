/*Basic Calculator
Create a function that takes two numbers and a mathematical operator + - / * and will perform a calculation with the given numbers.

Examples
calculator(2, "+", 2) ➞ 4
calculator(2, "*", 2) ➞ 4
calculator(4, "/", 2) ➞ 2
1. Pseudocode
FUNCTION calculator(number1, operator, number2)
    IF operator is "+"
        RETURN number1 + number2
    ELSE IF operator is "-"
        RETURN number1 - number2
    ELSE IF operator is "*"
        RETURN number1 * number2
    ELSE IF operator is "/"
    if number2 is 0
        RETURN "Error: Division by zero"
    ELSE
        RETURN number1 / number2
    ELSE
        RETURN "Invalid operator"
END FUNCTION
*/

function calculator(num1, operator, num2) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
        
            return num1 * num2;
        case "/":
          if (num2 === 0) {
            return "Error: Division by zero";
          }
            return num1 / num2;
        default:
            return "Invalid operator";
    }
} 
//using if else method
function calculatorIfElse(num1, operator, num2) {
    if (operator === "+") {
        return num1 + num2;
    } else if (operator === "-") {
        return num1 - num2;
    } else if (operator === "*") {
        return num1 * num2;
    } else if (operator === "/") {
      if (num2 === 0) {
        return "Error: Division by zero";
      }
        return num1 / num2;
    } else {
        return "Invalid operator";
    }
} 
//testing the functions
console.log(calculator(2, "+", 2)); // Output: 4
console.log(calculator(2, "*", 2)); // Output: 4
console.log(calculator(4, "/", 2)); // Output: 2
console.log(calculatorIfElse(5, "-", 3)); // Output: 2
console.log(calculatorIfElse(10, "/", 0)); // Output: Error: Division by zero
console.log("end of question 6");