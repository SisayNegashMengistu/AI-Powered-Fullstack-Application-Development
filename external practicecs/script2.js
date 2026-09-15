/*
Find the Smallest and Biggest Numbers
Create a function that takes an array of numbers and return both the minimum and maximum numbers, in that order.

Examples
minMax([1, 2, 3, 4, 5]) ➞ [1, 5]

minMax([2334454, 5]) ➞ [5, 2334454]

minMax([1]) ➞ [1, 1]
Notes: All test arrays will have at least one element and are valid.

1. Pseudocode
FUNCTION minMax(array)
    Set minimum = first element of array
    Set maximum = first element of array
    FOR each number in array
        IF number < minimum
            minimum = number
        IF number > maximum
            maximum = number
    RETURN [minimum, maximum]
END FUNCTION
2. JavaScript
*/
function minMax(array) {
  if(!Array.isArray(array) || array.length === 0) {
    throw new Error("Input must be a non-empty array");
  }
  
  let minimum = array[0];
  let maximum = array[0];
  
  for (let i = 1; i < array.length; i++) {
    if (array[i] < minimum) {
      minimum = array[i];
    }
    if (array[i] > maximum) {
      maximum = array[i];
    }
  }
  
  return [minimum, maximum];
}

//using for of method
function minMaxForOf(array) {
  if(!Array.isArray(array) || array.length === 0) {
    throw new Error("Input must be a non-empty array");
  } 
    let minimum = array[0];
    let maximum = array[0];
    for (let number of array) {
        if (number < minimum) {
            minimum = number;
        }
        if (number > maximum) {
            maximum = number;
        }
    }

    return [minimum, maximum];
} 
//testing the functions
let numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log(minMax(numbers)); // Output: [1, 9]
console.log(minMaxForOf(numbers)); // Output: [1, 9]
console.log("end of question 2");