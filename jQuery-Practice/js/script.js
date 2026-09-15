// Confirms script.js and jQuery are loaded correctly
console.log("jQuery Testing ...");

$(document).ready(function () {
  /* =========================================================
     QUESTION 1
     ========================================================= */
     console.log("Question- 1:");
  let sample1 = $("#sample1");
  // 1.2 Print the element itself
  console.log(sample1);
  // 1.3 Print the content of the element
  console.log(sample1.text());
  /* =========================================================
     QUESTION 2
     ========================================================= */
console.log("Question-2:");
  // 2.1 Select #techCompanies and display it
  let tech=$('#techCompanies');
  console.log("Tech Companies:");
  console.log(tech);

  // 2.2 How many tech companies are listed?
  let companyCount = $("#techCompanies li").length;
  console.log("Number of tech companies: " + companyCount);
  /* in other ways, using the children() method,jquery */
  const count = $("#techCompanies").children("li").length;
console.log(count);

  // 2.3 Select all elements with class "red"
  let allElementClassRed=$('.red');
  console.log("All elements whose classes red",allElementClassRed);
  // display their names
  $(".red").each(function () {
    console.log($(this).text());
});
  // 2.4 Create a new li with content "Facebook"
  let $newLi = $("<li></li>").text("Facebook");
  console.log($newLi);// display
  // 2.5 Give it a class of "blue"
  $newLi.addClass("blue");//we can use appendTo() method also to add class
  // 2.6 Append it right after the "Sony" li
  $("#techCompanies li").filter(function () {
    return $(this).text().trim() === "Sony";
  }).after($newLi);
//   //append after any one 
//   $("#techCompanies li").filter(function () {
//     return $(this).text() === "Dell";
// }).after("<li>Facebook</li>");
  // 2.7 Count how many are blue, show inside #blueCompanies
  let blueCount = $("#techCompanies li.blue").length;
  $("#blueCompanies").text("Number of blue companies: " + blueCount);
// //using find
// const blueCountusingFind = $("#techCompanies").find(".blue").length;

// $("#blueCompanies").text(blueCountusingFind);
// //using filter
// const blueCountusingFilter = $("#techCompanies li")
//     .filter(".blue")
//     .length;
// $("#blueCompanies").text(blueCountusingFilter);

  /* =========================================================
     QUESTION 3
     Fields: #in1, #in2  |  Button: #calcBtn
     Error: #calcErr     |  Results: #dsum, #davg
     ========================================================= */
$("#calcForm").on("submit", function (e) {

    e.preventDefault();

    // Get values
    let num1 = $("#in1").val().trim();
    let num2 = $("#in2").val().trim();

    // Clear previous errors
    $(".error").text("");
    $("input").removeClass("input-error");

    $("#dsum").text("");
    $("#davg").text("");

    // Track first invalid input
    let firstInvalid = null;

    // Validate input 1
    if (num1 === "") {

        $("#in1Err").text("Please enter the first number.");
        $("#in1").addClass("input-error");

        firstInvalid = $("#in1");

    } 
    else if (isNaN(num1)) {

        $("#in1Err").text("First number must be numerical.");
        $("#in1").addClass("input-error");

        firstInvalid = $("#in1");
    }

    // Validate input 2
    if (num2 === "") {

        $("#in2Err").text("Please enter the second number.");
        $("#in2").addClass("input-error");

        if (firstInvalid === null) {
            firstInvalid = $("#in2");
        }

    } 
    else if (isNaN(num2)) {

        $("#in2Err").text("Second number must be numerical.");
        $("#in2").addClass("input-error");

        if (firstInvalid === null) {
            firstInvalid = $("#in2");
        }
    }

    // If validation failed
    if (firstInvalid !== null) {

        firstInvalid.focus();

        return;
    }

    // Convert to numbers
    num1 = Number(num1);
    num2 = Number(num2);

    // Calculate
    let sum = num1 + num2;
    let average = sum / 2;
// 3.1. Display the result on the console
    console.log("Sum: " + sum);
    console.log("Average: " + average);
// 3.2. Display the result on the page
    $("#dsum").text(sum);
    $("#davg").text(average);

});

  /* =========================================================
     QUESTION 4
     Fields: #forF, #forL, #email  |  Form: #userForm
     Error: .err   |   Result output: .result
     ========================================================= */

  $("#userForm").on("submit", function (e) {
    e.preventDefault();

    let firstName = $("#forF").val().trim();
    let lastName = $("#forL").val().trim();
    let email = $("#email").val().trim();

    // Check all fields are provided
    if (!firstName || !lastName || !email) {
      $(".err").text("Please fill in all required fields.");
      return;
    }

    // Clear error, hide the form
    $(".err").text("");
    $("#userForm").hide();

    // Display the submitted values
    $(".result").html(
      "<p>First Name: " + firstName + "</p>" +
      "<p>Last Name: " + lastName + "</p>" +
      "<p>Email: " + email + "</p>"
    );
  });

});

    /* =========================================================
   QUESTION 5 - Apple.com footer mobile accordion
   =========================================================

   Assumes your HTML/CSS (done with Bootstrap/CSS only, per the hint)
   already looks something like this for each of the 5 footer columns:

   <div class="footer-column">
     <h3 class="footer-heading">
       Shop and Learn
       <span class="toggle-icon">+</span>
     </h3>
     <ul class="footer-links">
       <li><a href="#">Store</a></li>
       <li><a href="#">Mac</a></li>
       ...
     </ul>
   </div>

   And that your CSS hides ".footer-links" by default only inside a
   mobile media query (e.g. max-width: 767px), while the desktop/tablet
   view shows all columns expanded via Bootstrap's grid.

   If your class/element names are different, just swap the selectors
   below to match. Paste your actual footer HTML here and I can tailor
   this exactly.
   ========================================================= */

$(document).ready(function () {

  $(".footer-heading").on("click", function () {

    // Only run this accordion behavior on mobile size devices
    if ($(window).width() <= 767) {

      let $subLinks = $(this).siblings(".footer-links");
      let $icon = $(this).find(".toggle-icon");

      // Slide the sub-links open/closed
      $subLinks.slideToggle(300);

      // Swap the "+" and "x" icon depending on current state
      if ($icon.text() === "+") {
        $icon.text("x");
      } else {
        $icon.text("+");
      }
    }
  });

});


//promise
let promise = new Promise(function(resolve,reject){
  //make a network call/io call
  reject("I am rejected...");
});

//.then method having two callback functions, one for success and one for failure
promise.then(
  (result)=>{console.log(result);},
).catch((error)=>{console.log(error);}
).finally(()=>{console.log("I am always executed...");});

//excute

