// alert("your JS file is connected!!");
/*
Functions and conditional statements - practice exercise
Questions on functions
********************
*/ 
// Question-1
/* Define a simple function named myFirst that prints the word "Hello" on the console
○ First define the function
○ Then call the function */
function myFirst() {
  console.log("Hello");
}
myFirst();// calling the function or invoking the function
// FUNCTION EXPRESSIONS
const myFirst_expr = function () {
  console.log("Hello");
};

myFirst_expr();//calling the function or invoking the function
//  NAMED FUNCTION EXPRESSIONS
const myFirst_named = function myFirstImpl() {
  console.log("Hello");
};
myFirst_named();// calling the function or invoking the function
// ARROW FUNCTIONS( the most modern way of defining a function)
const myFirst_arrow = () => {
  console.log("Hello");
};
myFirst_arrow();
// if we have only one statement in the function body, 
// we can skip the curly braces and the return keyword us below
const myFirst_arrow2 = () => console.log("Hello");
myFirst_arrow2();
/*
Question 2
● Define a function called mySecond that takes a parameter and prints the parameter on
console
○ Feel free to give any value as a parameter in your function
*/
//function definition
function mySecond(myname) {
  console.log(myname);
}
mySecond("sisay");
//function expression
const mySecond_expr = function (myname) {
  console.log(myname);
};
mySecond_expr("sisay");
//named function expression
const mySecond_named = function mySecondImpl(myname) {
  console.log(myname);
};
mySecond_named("sisay");
//arrow function
const mySecond_arrow = (myname) => {
  console.log(myname);
};
mySecond_arrow("sisay");
/*
Question 3
● Define a function called myThird that takes a parameter and prints the parameter on the
console. But, it uses mySecond function to print the parameter on the console
*/
//function definition
function myThird(parameter) {
  mySecond(parameter);
}
myThird("This is my third function");
// //function expression
// const myThird_expr = function (parameter) {
//   mySecond(parameter);
// };
// myThird_expr("This is my third function");
// //named function expression
// const myThird_named = function myThirdImpl(parameter) {
//   mySecond(parameter);
// };
// myThird_named("This is my third function");
// //arrow function
// const myThird_arrow = (parameter) => {
//   mySecond(parameter);
// };
// myThird_arrow("This is my third function");
/*
Question 4
● Write a function named myFourth that takes an array as
 a parameter and prints 
only the first value of the array on the console.
*/

// function  definition
function myFourth([array]) {
  // console.log(array[0]);
  console.log( `The first element of the array is: ${array[0]}`);
}
myFourth([5, 10,12,55,66]); //call 

// function expression
// const x=12;
const myFourth_expr = function (array) {
  console.log( `The first element of the array is: ${array[0]}`);
};

myFourth_expr([5, 10,12,55,66]);
// //named function expression
// const myFourth_named = function myFourthImpl(array) {
//   console.log( `The first element of the array is: ${array[0]}`);
// };
// myFourth_named([5, 10,12,55,66]);
// //arrow function
// const myFourth_arrow = (array) => {
//   console.log( `The first element of the array is: ${array[0]}`);
// };
// myFourth_arrow([5, 10,12,55,66]);

/*
Question 5
● Write a function named myFifth that takes an array with two numbers in 
it as a parameter and prints the sum of the two numbers on console
*/
// function definition
function myFifth(arr) {
  const sum = arr[0] + arr[1];
  console.log(`The sum of the element array at index ${0} and ${1} is: ${sum}`);
}
myFifth([5, 7]); // prints 12
//function expression
const myFifth_expr = function (arr) {
  const sum = arr[0] + arr[1];
  console.log(`The sum of the element array at index ${0} and ${1} is: ${sum}`);
};
myFifth_expr([5, 7]); // prints 12
//named function expression
const myFifth_named = function myFifthImpl(arr) {
  const sum = arr[0] + arr[1];
  console.log(`The sum of the element array at index ${0} and ${1} is: ${sum}`);
};
myFifth_named([5, 7]); // prints 12
//arrow function
const myFifth_arrow = (arr) => {
  const sum = arr[0] + arr[1];
  console.log(`The sum of the element array at index ${0} and ${1} is: ${sum}`);
};
myFifth_arrow([5, 7]); // prints 12
/*
Questions on functions from edabit (https://edabit.com)
************************************************
It is very important that you do a lot of questions to advance your coding skills. 
Only practice makes you perfect. You can use online sources like https://edabit.com/ 
and solve as many problems as possible starting from an easy level. 
Note: when you practice questions from edabit, we advise you
to copy the questions, paste them on your VSC and solve them there. 
This makes your life easier as opposed to doing the exercises on edabit’s platform. 
Below, we have selected questions from edabit.com and included their URL link for 
your reference.
*/

/*
Question 6
● Write a function that takes an integer minutes and converts it to seconds.
 */
//function definition
function convert(minutes) {
	return 60 * minutes;
}
const result1=convert(6);
const result2=convert(4);
const result3=convert(8);
const result4 = convert(60);
console.log("result 1:",result1," result2:", result2,"result3:",result3,"result4:",result4);
//function expression
const convert_expr = function (minutes) {
  return 60 * minutes;
};
const result5 = convert_expr(6);
const result6 = convert_expr(4);
const result7 = convert_expr(8);
const result8 = convert_expr(60);
console.log("result 5:", result5, " result6:", result6, "result7:", result7, "result8:", result8);
//named function expression
const convert_named = function convertImpl(minutes) {
  return 60 * minutes;
};
const result9 = convert_named(6);
const result10 = convert_named(4);
const result11 = convert_named(8);
const result12 = convert_named(60);
console.log("result 9:", result9, " result10:", result10, "result11:", result11, "result12:", result12);
//arrow function
const convert_arrow = (minutes) => {
  return 60 * minutes;
};
const result13 = convert_arrow(6);
const result14 = convert_arrow(4);
const result15 = convert_arrow(8);
const result16 = convert_arrow(60);
console.log("result 13:", result13, " result14:", result14, "result15:", result15, "result16:", result16);


/*
Question 7
● Create a function that takes a number as a parameter, increments the number by +1 and
returns the result. */
function increments(num){
  if(isNaN(num)){
  console.log("please enter numeric values");
  return;
  }
  else{
  num++;
  return num;
  }
}
console.log(increments("7"));//output 8

/* Question 8
● Write a function that takes the base and height of a triangle and returns its area
*/
 
 function GetArea(base, height){
  if(isNaN(base) || isNaN(height)){
    console.log("enter numeric values");
  }
  else if(base<=0 || height<=0){
  console.log("height or base never be less than zero");
  }
  else{
  return 0.5*base*height;
  }
 }
 let b=-23;
 let h=4;
 console.log(`area of triangle with base=${b} and height =${h} well be: ${GetArea(b,h)}`);
/*Question 9
● Create a function that returns the total number of legs of all the animals. 
In this challenge, afarmer is asking you to tell him how many legs can be counted 
among all his animals. Thefarmer breeds three species 
(chickens = 2 legs, cows =, 4 legs, pigs = 4 legs). 
Remember: the farmer wants to know the total number of legs and 
not the total number of animals. 
*/
 function getTotalNumbersOfLegsOfAnimals( checken,cows,pigs){
  if(typeof(checken)!==Number || typeof(cows)!==Number||typeof(pigs)!==Number){
    console.log("please enter numeric values");
    }
    else if(checken<=0 || cows<=0||pigs<=0){
      console.log("please enter positive numbers");
    }else{
let totalLegs= 2*checken*2+4*cows*4+4*pigs*4;
return totalLegs;
    }
 }
 console.log(`total legs ${getTotalNumbersOfLegsOfAnimals(2,4,4)}`);
/*
Question 10 (not from edabit.com)
● Create a function that takes an array containing only TWO numbers as 
a parameter and returns a value that is 3 times the first element of the array.
 */
function returnThreeTimesTheFirstElement(array){
  return 3*array[0];
}
console.log(`three time the first element of array is ${returnThreeTimesTheFirstElement([23,45])}`);
/*
Questions on Conditional statements and - practice exercise
****************************************************
 */
/**
 Question 11
● Create a function that returns true when num1 is equal to num2; otherwise return false.
 */
function Compaire(num1,num2){
  if(num1===num2){
    return true;
  }else{
    return false;
  }
}

console.log(`is 5 equal to 5? ${Compaire(5,5)}`);
console.log(`is 5 equal to 6? ${Compaire(5,6)}`);

/*
Question 12
● Create a function that takes an integer and returns true if it's divisible by 100,
 otherwise return false
 */
 function isDivisibleBy100(num){
  if(num%100===0){
    return true;
  }else{
    return false;
  }
 }

 console.log(`is 100 divisible by 100? ${isDivisibleBy100(100)}`);
 console.log(`is 101 divisible by 100? ${isDivisibleBy100(101)}`);  

/*
Question 13
● Create a function that takes a number as an argument and 
returns "even" for even numbers and "odd" for odd numbers
 */
function evenOrOdd(num){
  if(num%2===0){
    return "even";
  }else{
    return "odd";
  }
}
console.log(`is 5 even or odd? ${evenOrOdd(5)}`);
console.log(`is 6 even or odd? ${evenOrOdd(6)}`); 

/*
Question 14
● Create a function that returns
○ “Invalid score” if score is above 100 or score is a negative number
○ “Grade A” when score is between 90 and 100 (both 90 and 100 included)
○ “Grade B” when score is between 80 and 89 (both 80 and 89 included)
○ “Grade C” for any score below 79
 */

function getGrade(score){
  if(score>100 || score<0){
    return "Invalid score";
  }else if(score>=90 && score<=100){
    return "Grade A";
  }else if(score>=80 && score<=89){
    return "Grade B";
  }else{
    return "Grade C";
  }
}
console.log(`score of 101 is ${getGrade(101)}`);
console.log(`score of -1 is ${getGrade(-1)}`);
console.log(`score of 95 is ${getGrade(95)}`);
console.log(`score of 85 is ${getGrade(85)}`);
console.log(`score of 75 is ${getGrade(75)}`);
