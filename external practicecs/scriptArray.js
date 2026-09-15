/* Module 1: Introduction to JavaScript Arrays */
          /*array creating*/  
//using array literal syntax  [] is shorter, faster, and unambiguous.
let numberArray = [1, 2, 3, 4, 5];
let nameArray = ["Alice", "Bob", "Charlie", "David"];
let mixedArray = [1, "Hello", true, null, undefined, { key: "value" }, [1, 2, 3]];
let emptyArray = [];
//uisng array constructor syntax
let numberArray2 = new Array(1, 2, 3, 4, 5);
let nameArray2 =  Array("Alice", "Bob", "Charlie", "David");
let mixedArray2 = new Array(5);
let emptyArray2 =  Array(5);
//modern way to create an array 
//1. Array.of() → creates an array from the values you give it.
// 2. Array.from() → creates an array from an iterable or array-like object.
let arrfusingof = Array.of(90,13,45,"67",[21,3,456],{name:"sisay",age:32});
/* arrfusingof
│
├── [0] → 90
├── [1] → 13
├── [2] → 45
├── [3] → "67"
│
├── [4] → [21, 3, 456]
│           │
│           ├── [0] → 21
│           ├── [1] → 3
│           └── [2] → 456
│
└── [5] → { name: "sisay", age: 32 }
             │
             ├── name → "sisay"
             └── age  → 32 */
let arrayusingFrom=Array.from("my name is sisay");
/* Accessing and Modifying Array Elements */
//accessing the 1st element
const firstElement=numberArray[0];
//accessing the last elements
const lastElement=numberArray[numberArray.length-1];
//updating the array elements
numberArray[0] = 10; // updates the first element
//accessing undefined array elements (// returns undefined if index is out of bounds)
let lengthOfArray = numberArray.length;
const undefinedElement = numberArray[10];//it works iff length=11
//accessing element of array arrfusingof example geting 21 in [],, and name
// accessing name form the above
let names=arrfusingof[5].name; // "sisay";
let ages=arrfusingof[5].age;//32
let nestedArray=arrfusingof[4][0];//21
/* length property: numbers.length returns the number of elements.
 Setting numbers.length = 2 truncates the array; setting it 
 larger than the current length pads it with empty slots.
 This is a frequent exam trick. */
 let a=[100,101,102,103,104];
document.getElementById("p2").innerHTML=a+"<br>";// display element of array on p.
 let smallerlength=a.length=2; // a is now [100, 101]
 document.write(smallerlength+"<br>"); // 2
  let largerlength=a.length=5;
  document.getElementById("h5").innerHTML=largerlength+"<br>"; // 5
//display element of array on p.
 document.getElementById("p1").innerHTML=a+"<br>";
 //display element of array on p 100,1001,,,.
 // Adding Elements: push() and unshift()
 a.push(105,106,107,108);
 // adds 105, 106, 107, and 108 to the end of the array
 a.unshift(99); 
 // adds 99 to the beginning of the array
 document.getElementById("p3").innerHTML=a+"<br>";
 //display element of array on p 99,100,101,105,106,107,108

//example 
let fruits = ["apple", "banana"];
let result = fruits.push("orange");
console.log(fruits);
console.log(result);
//Why does fruits.push(x).map(...) fail?
//-----------------------------------------
// fruits.push("orange").map(fruit => fruit.toUpperCase());//
// TypeError: fruits.push(...).map is not a function
        /*First, JavaScript executes:
        fruits.push("orange")
        The array becomes:
        ["apple", "banana", "orange"]
        But push() returns:
        3
        So JavaScript effectively tries to do:
        3.map(fruit => fruit.toUpperCase());
        But 3 is a number, not an array.
        Therefore, you get an error similar to:
        TypeError: fruits.push(...).map is not a function
        Correct way to chain map()
        If you want to add an item and then use map(), you could do:
//------------------------------------------------------------------
         */
let fru = ["apple", "banana","Abocado","grape"];
fru.push("orange");//add at the end of the array, O(1),
let result3 = fru.map(fruit => fruit.toUpperCase());
// console.log(result);
document.getElementById("p4").innerHTML=result3+"<br>";
// display element of array on p4 APPLE,BANANA,ORANGE
//unshif
let addBeginning = fru.unshift("kiwi","mango");//add at the beginning of the array, O(n),
document.getElementById("p6").innerHTML=addBeginning+"<br/>";//display 7
//Removing Elements: pop() and shift()
//Removes and returns the LAST element of an array.
let lastElementRemoved = fru.pop(); // removes "orange"
document.getElementById("p6").innerHTML=lastElementRemoved+"<br/>";
let firstElementRemoved = fru.shift(); // removes "kiwi"
document.getElementById("p7").innerHTML=firstElementRemoved+"<br/>";
/*Summary
===========================================================
Method|	End/Start|	Adds/Removes|	   Returns	|      Mutates?
============================================================
push() End	         Adds	          New length	     Yes
pop() 	End	        Removes	       Removed element   Yes
unshift()	Start	    Adds	          New length	    Yes
shift()	Start.    	Removes	       Removed element	 Yes
===========================================================
 */
/* Module 2: Copying, Type-Checking, and Destructuring Arrays 
 2.1 Copying / Cloning Arrays 
 A) using slice() method
 slice(start,end)//clone or copy
 start and end may be default zero and array.length respectively
 look example below
 */
const aa = [1, 2, 3];
const b = aa.slice();      // real independent copy: [1,2,3]
const c = aa.slice(1);     // [2, 3]
const d = aa.slice(-2);    // [2, 3]
const e=aa.slice(-1);//[3]
b.push(4);
document.getElementById("p8").innerHTML="AA=:"+aa+"<br>";// display element of array on p.[1,2,3] unchanged
document.getElementById("p9").innerHTML="B=:"+b+"<br>";// display element of array on p.[1,2,3,4] new array
document.getElementById("p10").innerHTML="E=:"+e+"<br>";// display element of array on p.[3] new array
//using spread operator
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray]; // creates a shallow copy of the array
copiedArray.push(4);
document.getElementById("p11").innerHTML="Original Array: "+originalArray+"<br>"; // [1, 2, 3]
document.getElementById("p12").innerHTML="Copied Array: "+copiedArray+"<br>"; // [1, 2, 3, 4] 
/*In short 
here are three useful levels of copying arrays to understand:
 direct/reference assignment, shallow copy, and deep copy.
1. Direct Copy / Reference Copy
Definition
You are not actually creating a new array. Both variables point to the same array.
Syntax
const copy = original;
Example */
const original = [10, 20, 30];
const copy = original;
copy.push(40);
console.log(original); // [10, 20, 30, 40]
console.log(copy);     // [10, 20, 30, 40]
/*Note:-
copy = original
     ↓
Same array

❌ Not an independent copy. */
/**
2. Shallow Copy
Definition
Creates a new outer array, but nested arrays/objects inside are still shared by reference.
Syntax
Using slice():
const copy = original.slice();
Using spread:
const copy = [...original];
Example
 */
const originalTwo = [10, 20, 30];
const copyTwo = [...originalTwo];
copy.push(40);
console.log(originalTwo); // [10, 20, 30]
console.log(copyTwo);     // [10, 20, 30, 40]
