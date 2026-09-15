
/* 1. Given an array of numbers, write a function that prints in the
 console another array which contains all the even numbers in the original array, 
 w//hich also have even indexes only.
○ Test 1: getOnlyEvens([1, 2, 3, 6, 4, 8]) prints [ 4]
○ Test 2: getOnlyEvens([0, 1, 2, 3, 4]) prints [0, 2, 4] */
console.log("Question 1");
console.log("Method 1");
function getOnlyEvens(arr) {
    // Validate input is an array
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array.");
    }

    // Validate every element is a number
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== "number" || Number.isNaN(arr[i])) {
            throw new Error("All elements in the array must be numbers.");
        }
    }

    const result = [];
    // Check even numbers at even indexes
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0 && i % 2 === 0) {
            result.push(arr[i]);
        }
    }

    console.log(result);
}

// Test 1
getOnlyEvens([1, 2, 3, 6, 4, 8]);// [4]

// Test 2
getOnlyEvens([0, 1, 2, 3, 4]);// [0, 2, 4]

// Invalid input
// getOnlyEvens([1, 2, "4", 6]);// Error: All elements in the array must be numbers.
// method 2
console.log("Method 2");
function getOnlyEvens(arr) {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array.");
    }
    const result = arr.filter((num, index) => {
        if (typeof num !== "number" || Number.isNaN(num)) {
            throw new Error("All elements in the array must be numbers.");
        }
        return num % 2 === 0 && index % 2 === 0;
    });
    console.log(result);
}
// Test cases
getOnlyEvens([1, 2, 3, 6, 4, 8]); // [4]
getOnlyEvens([0, 1, 2, 3, 4]); // [0, 2, 4]

/* 2. Create a function that takes a two-digit number as an parameter and prints "Ok" in
the console if the given string is greater than its reversed digit version. If not, the
function will print "Not ok"
○ Test 1: reverseCompare(72) prints "ok" because 72 > 27
○ reverseCompare(23) prints "Not ok", because 23 is not greater than 32 */
console.log("Question 2");
console.log("Method 1");
function reverseCompare(num) { // let 72
    let tens = Math.floor(num / 10); // tens=72/10=7
    let ones = num % 10;// ones=72%10=2
    let reversed = ones * 10 + tens;// reversed=2*10+7=27
    if (num >reversed) {// 72>27
        console.log("Ok");//print ok
    } else {
        console.log("Not ok");// print not ok
    }
}
reverseCompare(725); 
reverseCompare(337); 
console.log("Method 2");
function reverseCompareFun(num) {
    if(!Number.isInteger(num) || num < 10 || num > 99) {
        console.log("Input must be a two-digit integer.");
        return;
    }
    let str = num.toString();//72 -> "72"
    let reversed = str[1] + str[0];//Reverse "72" -> "27"
    if (num > Number(reversed)) {//Compare 72 > 27  "Number(reversed);"
        console.log("Ok");// true -> "Ok"
    } else {
        console.log("Not ok");// not true -> "Not ok"
    }
}

reverseCompareFun(72); // Ok
reverseCompareFun(23); // Not ok// 32

/* 3.Write a function that takes a positive integer and returns the factorial of the number.
Notes: The factorial of 0 is 1. Ex: factorial seven is : 1 × 2 × 3 × 4 × 5 × 6 × 7. The
factorial of any positive integer x is x * (x - 1) * (x - 2) * . . . . . . * 1 (ex: factorial of 4 is
4 * 3 * 2 * 1 = 24)
○ Test 1: returnFactorial(5) outputs 120
○ Test 2: returnFactorial(6) outputs 720
○ Test 3: returnFactorial(0) outputs 1 */
console.log("Question 3");
console.log("Method 1");
// using recursion functions
  const factorial = (n) => {
    if (n === 0) {
      return 1;
    }
      return n * factorial(n - 1);
    
  };


  // 0! 1, base case   stack overflow

//5!

let num = 5;
  const result = factorial(num);
  console.log(result);

//method 2
console.log("Method 2");
function returnFactorial(num) {
    // Validate that the input is a number
    if (typeof num !== "number" || Number.isNaN(num)) {
        throw new Error("Input must be a number.");
    }

    // Validate that the number is a non-negative integer
    if (!Number.isInteger(num)) {
        throw new Error("Input must be a non-negative integer.");
    }
  // Factorial of 0 is 1
    if (num === 0) {
        return 1;
    }


    let factorial = 1;
    // Calculate factorial
    for (let i = 1; i <= num; i++) {
        factorial *= i;
    }
    return factorial;
}

// Tests
console.log(returnFactorial(5)); // 120
console.log(returnFactorial(6)); // 720
console.log(returnFactorial(0)); // 1

// Invalid examples
// console.log(returnFactorial(-5));   // Error
// console.log(returnFactorial(2.5));  // Error
// console.log(returnFactorial("5"));  // Error

  /* 4 (Meera array)
● A Meera array is defined to be an array containing only numbers as its elements and for
all n values in the array, the value n*2 is not in the array. So [3, 5, -2] is a Meera array
because 3*2, 5*2 or 2*2 are not in the array. But [8, 3, 4] is not a Meera array because
2*4=8 and both 4 and 8 are elements found in the array. Write a function that takes an
array of numbered elements and prints “I am a Meera array” in the console if its array
does NOT contain n and also n*2 as value. Otherwise, the function prints “I am NOT a
Meera array”
○ Test 1: checkMeera([10, 4, 0, 5]) outputs “I am NOT a Meera array” because 5 *
2 is 10
○ Test 2: checkMeera([7, 4, 9]) outputs “I am a Meera array”
○ Test 1: checkMeera([1, -6, 4, -3]) outputs “I am NOT a Meera array” because -3
*2 is -6 */

/********************** Steps(pseudocode(algorithms))****************************
START
FUNCTION checkMeera(array)
    FOR each element n in array
        IF n * 2 exists in array THEN
            PRINT "I am NOT a Meera array"
            RETURN
        END IF
    END FOR
    PRINT "I am a Meera array"
END FUNCTION
TEST the function with different arrays
END
*********************************************************************************/
console.log("Question 4");
console.log("Method 1: using Includes");
function checkMeera(arr) {
    // Check if input is an array and all elements are numbers
    if (!Array.isArray(arr) || !arr.every(num => typeof num === "number")) {
        console.log("Input must be an array and all elements must be numbers.");
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        let n = arr[i];
        if (arr.includes(n * 2)) {
            console.log("I am NOT a Meera array");
            return;
        }
    }
    console.log("I am a Meera array");
} 
//calling
checkMeera([10, 4, 0, 5]); // 10 × 2 = 20 → 20 is NOT a Meera array
checkMeera([7, 4, 9]); // A Meera array 
checkMeera([1, -6, 4, -3]); //-3*2=-6 → -6 is NOT a Meera array

//Method 2
console.log("Method 2: using nested loop");
function MeeraArray(arr) {
    //check if input is an array and all elements are numbers
    if (!Array.isArray(arr) || !arr.every(num => typeof num === "number")) {
        console.log("Input must be an array and all elements must be numbers.");
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] === arr[i] * 2) {
                console.log("I am NOT a Meera array");
                return;
            }
        }
    }
    console.log("I am a Meera array");
}
//calling
MeeraArray([1, 3, 5]); 
// Example: arr = [1, 3, 5]
// i = 0 → arr[i] = 1
//     j = 0 → arr[j] = 1 → 1 === 1 * 2 → false
//     j = 1 → arr[j] = 3 → 3 === 1 * 2 → false
//     j = 2 → arr[j] = 5 → 5 === 1 * 2 → false
//
// i = 1 → arr[i] = 3
//     j = 0 → arr[j] = 1 → 1 === 3 * 2 → false
//     j = 1 → arr[j] = 3 → 3 === 3 * 2 → false
//     j = 2 → arr[j] = 5 → 5 === 3 * 2 → false
//
// i = 2 → arr[i] = 5
//     j = 0 → arr[j] = 1 → 1 === 5 * 2 → false
//     j = 1 → arr[j] = 3 → 3 === 5 * 2 → false
//     j = 2 → arr[j] = 5 → 5 === 5 * 2 → false
//
// No match found → "A Meera array" 
//method 3
function checkMeeraMethod3(arr) {
    //check if input is an array and all elements are numbers
    if (!Array.isArray(arr) || !arr.every(num => typeof num === "number")) {
        console.log("Input must be an array and all elements must be numbers.");
        return;
    }
    const ismeera = arr.some(function (n) {
        return arr.includes(n * 2);
    });
    if (ismeera) {
        console.log("I am NOT a Meera array");
    } else {
        console.log("I am a Meera array");
    }
}
// calling
checkMeeraMethod3([10, 4, 0, 5]);//?
checkMeeraMethod3([7, 4, 9]);//?
checkMeeraMethod3([1, -6, 4, -3]);//?

/* Question 5 (Dual array)
 Define a Dual array to be an array where every value occurs exactly twice. For example,
{1, 2, 1, 3, 3, 2} is a dual array.The following arrays are not Dual arrays {2, 5, 2, 5, 5} (5
occurs three times instead of two times) {3, 1, 1, 2, 2} (3 occurs once instead of two
times) Write a function named isDual that returns 1 if its array argument is a Dual array.
Otherwise it returns 0. 
algorithms
==================================      
        START
        FUNCTION isDual(array)
            FOR each value in the array
                COUNT how many times the value occurs
                IF the count is not equal to 2
                    RETURN 0
                END IF
            END FOR
            RETURN 1 // if count of all values is 2, then it is a Dual array
        END FUNCTION

====================================
*/

console.log("Question 5");
console.log("Method 1:using nested loop");
function isDualM1(arr) {
    //check if input is an array and all elements are numbers
    if (!Array.isArray(arr) || !arr.every(num => typeof num === "number")) {
        console.log("Input must be an array and all elements must be numbers.");
        return;
    }   
    for (let i = 0; i < arr.length; i++) {
        let count = 0;
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                count++;
            }
        }
        if (count !== 2) {
            return 0;
        }
    }
    return 1;
}
// calling
console.log(isDualM1([1, 2, 1, 3, 3, 2]));//1


//====================dimonstrations=====================
// Example: arr = [1, 2, 1, 3, 3, 2]

// i = 0 → arr[i] = 1
//     count = 0
//     j = 0 → arr[j] = 1 → 1 === 1 → true  → count = 1
//     j = 1 → arr[j] = 2 → 1 === 2 → false
//     j = 2 → arr[j] = 1 → 1 === 1 → true  → count = 2
//     j = 3 → arr[j] = 3 → 1 === 3 → false
//     j = 4 → arr[j] = 3 → 1 === 3 → false
//     j = 5 → arr[j] = 2 → 1 === 2 → false
//     count = 2 → count === 2 → continue

// i = 1 → arr[i] = 2
//     count = 0
//     j = 0 → arr[j] = 1 → 2 === 1 → false
//     j = 1 → arr[j] = 2 → 2 === 2 → true  → count = 1
//     j = 2 → arr[j] = 1 → 2 === 1 → false
//     j = 3 → arr[j] = 3 → 2 === 3 → false
//     j = 4 → arr[j] = 3 → 2 === 3 → false
//     j = 5 → arr[j] = 2 → 2 === 2 → true  → count = 2
//     count = 2 → count === 2 → continue

// i = 2 → arr[i] = 1
//     count = 0
//     j = 0 → arr[j] = 1 → 1 === 1 → true  → count = 1
//     j = 1 → arr[j] = 2 → 1 === 2 → false
//     j = 2 → arr[j] = 1 → 1 === 1 → true  → count = 2
//     j = 3 → arr[j] = 3 → 1 === 3 → false
//     j = 4 → arr[j] = 3 → 1 === 3 → false
//     j = 5 → arr[j] = 2 → 1 === 2 → false
//     count = 2 → count === 2 → continue


// i = 3 → arr[i] = 3
//     count = 0
//     j = 0 → arr[j] = 1 → 3 === 1 → false
//     j = 1 → arr[j] = 2 → 3 === 2 → false
//     j = 2 → arr[j] = 1 → 3 === 1 → false
//     j = 3 → arr[j] = 3 → 3 === 3 → true  → count = 1
//     j = 4 → arr[j] = 3 → 3 === 3 → true  → count = 2
//     j = 5 → arr[j] = 2 → 3 === 2 → false
//     count = 2 → count === 2 → continue


// i = 4 → arr[i] = 3
//     count = 0
//     j = 0 → arr[j] = 1 → 3 === 1 → false
//     j = 1 → arr[j] = 2 → 3 === 2 → false
//     j = 2 → arr[j] = 1 → 3 === 1 → false
//     j = 3 → arr[j] = 3 → 3 === 3 → true  → count = 1
//     j = 4 → arr[j] = 3 → 3 === 3 → true  → count = 2
//     j = 5 → arr[j] = 2 → 3 === 2 → false
//     count = 2 → count === 2 → continue


// i = 5 → arr[i] = 2
//     count = 0
//     j = 0 → arr[j] = 1 → 2 === 1 → false
//     j = 1 → arr[j] = 2 → 2 === 2 → true  → count = 1
//     j = 2 → arr[j] = 1 → 2 === 1 → false
//     j = 3 → arr[j] = 3 → 2 === 3 → false
//     j = 4 → arr[j] = 3 → 2 === 3 → false
//     j = 5 → arr[j] = 2 → 2 === 2 → true  → count = 2
//     count = 2 → count === 2 → continue


// All elements have count = 2
// Therefore:
// return 1
//
// Output:
// 1

//==========================================
// console.log(isDualM1([2, 5, 2, 5, 5]));//0
// console.log(isDualM1([3, 1, 1, 2, 2]));//0
// //method 2
// console.log("method 2: using an object");

// function isDualM2(arr) {
//     //check if input is an array and all elements are numbers
//     if (!Array.isArray(arr) || !arr.every(num => typeof num === "number")) {
//         console.log("Input must be an array and all elements must be numbers.");
//         return;
//     }
//   let countMap = {};// This creates an empty object that will store each number and how many times it appears.
//   for (let i = 0; i < arr.length; i++) {
//     let num = arr[i];//This stores the current array value in num.
//     countMap[num] = (countMap[num] || 0) + 1;//Take the current count of this number. If it doesn't exist, use 0. Then add 1."
//   }
//   for (let key in countMap) {
//     if (countMap[key] !== 2) {
//       return 0; // Not a Dual array
//     }
//   }
//   return 1; // Is a Dual array
// }

// // calling
// console.log(isDualM2([7, 2, 7, 3, 3, 2])); // returns 1
// console.log(isDualM2([2, 5, 2, 5,5])); // returns 0
// console.log(isDualM2([3, 1, 1, 2, 2])); // returns 0
// Method 3
console.log("Method 3: Using filter");
function isDualM3(arr) {
    //check if input is an array and all elements are numbers
if (!Array.isArray(arr) || !arr.every(num => typeof num === "number")) {
    console.log("Input must be an array and all elements must be numbers.");
    return;
}
    for (let i = 0; i < arr.length; i++) {
        let count = arr.filter(value => value === arr[i]).length;
        if (count !== 2) {
            return 0;
        }
    }
    return 1;
}
console.log(isDualM3([7, 2, 7, 3, 3, 2])); // 1
console.log(isDualM3([2, 6, 2, 6, 5, 5]));    // 1
console.log(isDualM3([3, 1, 1, 2, 2]));    // 0


/* Question 6
● Write a function that takes the number of seconds and returns the digital format clock
time as a string. Time should be counted from 00:00:00.
○ Examples: digitalClock(5025) as "01:23:45" 5025 seconds is 1 hour, 23 mins, 45
secs.
■ digitalClock(61201) as "17:00:01" No AM/PM. 24h format.
■ digitalClock(87000) as "00:10:00" It's 00:10 next day. */
console.log("Question 6");
console.log("Method 1");
  
function digitalClock(seconds) {
    //check if input is a number and non-negative
if (typeof seconds !== "number" || Number.isNaN(seconds) || seconds < 0) {
    console.log("Input must be a non-negative number.");
    return;
} 
    let hours = Math.floor(seconds / 3600) % 24; // Calculate hours and wrap around 24
    let minutes = Math.floor((seconds % 3600) / 60); // Calculate minutes
    let secs = seconds % 60; // Calculate remaining seconds
    // Format the time as HH:MM:SS
    let formattedTime = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(secs).padStart(2, '0');
    return formattedTime;
}

//calling
console.log(digitalClock(5025));   // "01:23:45"
console.log(digitalClock(61201));  // "17:00:01"
console.log(digitalClock(87000));  // "00:10:00"
//method 2
console.log("Method 2");
function digitalClock(seconds) {
    //check if input is a number and non-negative
if (typeof seconds !== "number" || Number.isNaN(seconds) || seconds < 0) {
    console.log("Input must be a non-negative number.");
    return;
} 
    let hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    // Keep the clock within 24 hours
    hours = hours % 24;
    // Add leading zeros
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    secs = String(secs).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
}
//calling
console.log(digitalClock(5025));  // "01:23:45"
console.log(digitalClock(61201)); // "17:00:01"
console.log(digitalClock(87000)); // "00:10:00"
//method 3
console.log("Method 3");
function digitalClock(seconds) {
    //check if input is a number and non-negative
    if (typeof seconds !== "number" || Number.isNaN(seconds) || seconds < 0) {
        console.log("Input must be a non-negative number.");
        return;
    }   
    let date = new Date(seconds * 1000);
    let hours = String(date.getUTCHours()).padStart(2, "0");
    let minutes = String(date.getUTCMinutes()).padStart(2, "0");
    let secs = String(date.getUTCSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
}
//calling
console.log(digitalClock(5025));  // "01:23:45"
console.log(digitalClock(61201)); // "17:00:01"
console.log(digitalClock(87000)); // "00:10:00"