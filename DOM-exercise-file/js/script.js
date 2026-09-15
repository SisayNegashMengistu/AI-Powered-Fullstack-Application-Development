/*
Question 1: The following three questions are based on the two paragraphs under the
section which says "For Question 1" in the index.html file.
1.1 Select the element with an id of "sample1".
1.2 Print the element itself on the console upon page refresh.
1.3 Print the content of the element on the console upon page refresh.

*/
const sample1Element = document.getElementById("sample1");
console.log(sample1Element);
console.log(sample1Element.textContent);
/*
Question 2: The following questions are based on the HTML code found under the
section labeled "For question 2".
2.1 Select the element with an ID of "techCompanies" and display it on your
console. (Do not use "querySelector" for this question)
2.2 Use "querySelector" to select the element with an ID of "techCompanies"
and display it on your console.
2.3 How many tech companies are listed under the ul element with an id of
"techCompanies"? Use "querySelectorAll" to count the total.
2.4 Select all elements with a class name of "red" and display them on the
console. Use both "querySelectorAll" and "getElementByClass"
2.5 Create a new li HTML element with a content of "Facebook" and display it
on console
2.6 Give the newly created element a class of "blue" using JavaScript
2.7 Append the newly created element next to the the "Sony" li element
2.8 How many of the tech companies are labeled blue? Find the result
using JavaScript and display the result inside the "blueCompanies" div.
 */
//solution 2.1
const techCompanies = document.getElementById("techCompanies");
console.log(techCompanies);
//solution 2.2
const techCompanies2 = document.querySelector("#techCompanies");
console.log(techCompanies2);
//solution 2.3
const companies = document.querySelectorAll("#techCompanies li");
console.log(companies.length);
//solution 2.4
// Using querySelectorAll()
const redCompanies = document.querySelectorAll(".red");
console.log(redCompanies);
// Using getElementsByClassName()
const redCompanies2 = document.getElementsByClassName("red");
console.log(redCompanies2);
//solution 2.5
const facebook = document.createElement("li");
facebook.textContent = "Facebook";
console.log(facebook);// <li>Facebook</li>
//solution 2.6
facebook.classList.add("blue");
console.log(facebook);//<li class="blue">Facebook</li>
//solution 2.7
const sony = document.querySelector("#techCompanies li:last-child");
sony.after(facebook);
//solution 2.8
const blueCompanies = document.querySelectorAll("#techCompanies .blue");
document.querySelector("#blueCompanies").textContent =
  blueCompanies.length;


  /*Question 3:
  Change the background color of the page to light-blue (#99ecff) when clicked on the text
  that says "Yes". If there is a background color set already, change it to none when clicked
  on "No"
  Hint: First, write two functions to alter the backgroundColor of the page. One to add a
  background color, another to remove. Then, select the "yesBackground" or
  "noBackground" element and bind the selected element with the click event. Finally,
  attach the function you wrote to alter the background color when the respective element
  is clicked on. */
  //solution 3
  // Function to add background color
function addBackground() {
  document.body.style.backgroundColor = "#99ecff";
}

// Function to remove background color
function removeBackground() {

  document.body.style.backgroundColor ="";
  // document.body.style.backgroundColor = "#fff";``
}

// Select the buttons
const yes = document.querySelector("#yes");
const no = document.querySelector("#No");

// Add click events
yes.addEventListener("click", addBackground);
no.addEventListener("click", removeBackground);

  /*Question 4:
  A form with two text fields is provided under the section which says "For question 4".
  Write a JavaScript code which takes the values of the two fields, checks if they are
  number values and calculate the sum of the two numbers.
  1. Display the result on the console
  2. Display the result underneath the form
  3. If any of the numbers provided is not a number, display a message that says
  "Please enter numerical values only" underneath the form */
  //solution 4

function handleSubmit(event) {
  // Prevent form from refreshing the page
  event.preventDefault();

  // Get input values
  const firstValue = document.getElementsByName("first-value")[0].value.trim();
  const secondValue = document.getElementsByName("second-value")[0].value.trim();

  const result = document.querySelector("#sum");
  // 1. Check if both fields are empty
  if (firstValue === "" && secondValue === "") {
    result.textContent = "Please enter values in both fields";
    return;
  }

  // 2. Check if first field is empty
  if (firstValue === "") {
    result.textContent = "Please enter the first value";
    return;
  }

  // 3. Check if second field is empty
  if (secondValue === "") {
    result.textContent = "Please enter the second value";
    return;
  }

  // Convert values to numbers
  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);

  // 4. Check if values are numbers
  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    result.textContent = "Please enter numerical values only";
    return;
  }

  // 5. Calculate sum
  const sum = firstNumber + secondNumber;

  // 6. Calculate average
  const average = sum / 2;

  // 7. Display in console
  console.log("Sum:", sum);
  console.log("Average:", average);

  // 8. Display underneath the form
  result.textContent = `Sum: ${sum} | Average: ${average}`;
}
//method 2  Using input elements directly

function handleSubmit2(event) {
  event.preventDefault();

  const first = document.querySelector("#firstValue").value;
  const second = document.querySelector("#secondValue").value;

  if (first === "" || second === "") {
    document.querySelector("#sum").textContent =
      "Please enter both values";
    return;
  }

  if (isNaN(first) || isNaN(second)) {
    document.querySelector("#sum").textContent =
      "Please enter numerical values only";
    return;
  }

  const sum = Number(first) + Number(second);

  document.querySelector("#sum").textContent =
    `The sum is ${sum}`;
}

//method 3 using form.element

function handleSubmit3(event) {
  event.preventDefault();

  const form = event.target;

  const first = form.elements["first-value"].value;
  const second = form.elements["second-value"].value;

  const result = document.querySelector("#sum");

  if (first.trim() === "" || second.trim() === "") {
    result.textContent = "Please enter both values";
    return;
  }

  if (isNaN(first) || isNaN(second)) {
    result.textContent = "Please enter numerical values only";
    return;
  }

  const sum = Number(first) + Number(second);
  const average = sum / 2;

  console.log("Sum:", sum);
  console.log("Average:", average);

  result.textContent = `Sum: ${sum}, Average: ${average}`;
}
