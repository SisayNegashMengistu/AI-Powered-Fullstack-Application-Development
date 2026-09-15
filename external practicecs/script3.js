/*
question 3:Christmas Eve is almost upon us, so naturally we need to prepare some milk 
and cookies for Santa! Create a function that accepts a Date object and returns true if 
it's Christmas Eve (December 24th) and false otherwise. Keep in mind JavaScript's 
Date month is 0 based, meaning December is the 11th month while January is 0.
Examples
timeForMilkAndCookies(new Date(2013, 11, 24)) ➞ true

timeForMilkAndCookies(new Date(2013, 0, 23)) ➞ false

timeForMilkAndCookies(new Date(3000, 11, 24)) ➞ true
1. Pseudocode
FUNCTION timeForMilkAndCookies(date)
    Get the month from date
    Get the day from date
    IF month is 11 AND day is 24
        RETURN true
    ELSE
        RETURN false
END FUNCTION
2. JavaScript
 */
//method 1
function timeForMilkAndCookies(date) {
    let month = date.getMonth();
    let day = date.getDate();

    if (month === 11 && day === 24) {
        return true;
    } else {
        return false;
    }
}
//method 2
function timeForMilkAndCookies2(date) {
    return date.getMonth() === 11 && date.getDate() === 24;
}

//method 1  call 
console.log(timeForMilkAndCookies(new Date(2013, 11, 24))); // Output: true
console.log(timeForMilkAndCookies(new Date(2013, 0, 23))); // Output: false
console.log(timeForMilkAndCookies(new Date(3000, 11, 24))); // Output: true
//method 2 call
console.log(timeForMilkAndCookies2(new Date(2013, 11, 24))); // Output: true
console.log(timeForMilkAndCookies2(new Date(2013, 0, 23))); // Output: false
console.log(timeForMilkAndCookies2(new Date(3000, 11, 24))); // Output: true

console.log("end of question 3");
