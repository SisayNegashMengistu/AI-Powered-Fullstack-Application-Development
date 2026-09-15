
/* ============================================================
   QUESTION 1 - Comparison operators
   ============================================================ */
console.log("=====Question 1=====");
console.log("A:", 24 > 3); // true
console.log("B:", 2 < "12"); // true  ("12" -> 12)
console.log("C:", 0 == 2); // false
console.log("D:", 2.0 === 2); // true  (2.0 is just 2 in JS)
console.log("E:", 2.0 == "2"); // true  ("2" -> 2)
console.log("F:", 2 < "John"); // false ("John" -> NaN)
console.log("G:", 2 > "John"); // false ("John" -> NaN)
console.log("H:", "2" < "2");  // false// 
console.log("I:", "2" > "12"); // true  (string/char comparison: '2' > '1')
console.log("J:", 1 == 1 || 3 == 2 || 3 == 7);// true
console.log("K:", 1 == 1 && 2 == 2 && 3 == 7); // false
console.log("L:", 1 == 1 || 2 == 2 && 3 == 7); // true
console.log("M:", (1 == true && 0 > true) || "31" > "9" || 10 > 5 || !("2" == "two" || 1 == "1")); // true
/* ============================================================
   QUESTION 2 - Answers (with short explanations)
   ============================================================ */
console.log("=====Question 2=====");
/* 1. Which expression returns true?
A: '1' === 1   -> false (different types, strict equality)
B: 1 == 1      -> true, check value, then display boolean result
C: 1 === 1     -> true, check value and type, then display boolean result
D: B and C     -> Correct answer: D */
console.log("Q2.1:", '1' === 1, 1 == 1, 1 === 1, "Answer: D (B and C)");
// 2. let x = (1 == true);
// true is coerced to 1, so 1 == 1 -> true
// Answer: B (true)
let x2 = (1 == true);
console.log("Q2.2 x =", x2, "Answer: B (true)");
// What is the value of y from the following statements?
// 3. let x = 10; let y = (x > 5) && (x < 15);
// (10 > 5) is true, (10 < 15) is true -> true && true -> true
// Answer: D (true)
let x3 = 10;
let y3 = (x3 > 5) && (x3 < 15);
console.log("Q2.3 y =", y3, "Answer: D (true)");
// What is the value of x from the following statements?
// 4. let x = 5; x += 3;i.e x=x+3
// x = 5 + 3 = 8
// Answer: B (8)
let x4 = 5;
x4 += 3;
console.log("Q2.4 x =", x4, "Answer: B (8)");
// 5 What is the value of y from the following statements?
//  let x = 10; let y = x++; i.e y=x+1
// x++ is POST-increment: y gets the value of x BEFORE incrementing
// y = 10 (x then becomes 11)
// Answer: A (10)
let x5 = 10;
let y5 = x5++;
console.log("Q2.5 y =", y5, "(x is now", x5 + ")", "Answer: A (10)");

// 6 What is the value of y in the following statements?
//  let x = 1; let y = (x !== 2);
// 1 !== 2 -> true
// Answer: D (true)
let x6 = 1;
let y6 = (x6 !== 2);
console.log("Q2.6 y =", y6, "Answer: D (true)");

// 7. What is the output of (+"2"+2)?
// Unary + converts "2" to the number 2, then 2 + 2 = 4
console.log("Q2.7:", (+"2" + 2), "-> Answer: 4");

// 8. What is the output of (7 % 3)?
// Remainder of 7 divided by 3 = 1
console.log("Q2.8:", (7 % 3), "-> Answer: 1");

// 9. What is the output of (2 + true)?
// true is automatically converted to 1, so 2 + 1 = 3
console.log("Q2.9:", (2 + true), "-> Answer: 3");
console.log("Q2.9:", (2 + "true"), "-> Answer: 3");// 2 + "true" = "2true" (string concatenation)

/* ============================================================
   QUESTION 3 - Add two numbers
   ============================================================ */
console.log("=====Question 3=====");
let a = 1;
let b = 2;
let c = a + b;
console.log("c =", c);
/* ============================================================
   QUESTION 4 - Concatenate first and last name
   ============================================================ */
console.log("=====Question 4=====");
let firstName = "Sisay";
let lastName = " Negash";
let fullName = firstName +  lastName;
console.log (`my name is ${fullName} Thank you`)