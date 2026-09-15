/*Travelling Salesman Problem
A salesman has a number of cities to visit. He wants to calculate the total number of possible paths he could take, visiting each city once before returning home. Return the total number of possible paths a salesman can travel, given n cities.

If we have cities A, B and C, possible paths would be:

A -> B -> C
A -> C -> B
B -> A -> C
B -> C -> A
C -> B -> A
C -> A -> B 
1. Pseudocode
FUNCTION travellingSalesman(n)
    Set result = 1
    FOR i from 1 to n
        result = result * i
    RETURN result
END FUNCTION
This calculates:

n! = n × (n-1) × (n-2) × ... × 1
*/
function travellingSalesman(n){
    let result = 1;
    if(n === 0 || n === 1) {
        return 1;
    }
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;  
}
//method 2 using recursion
function travellingSalesmanRecursion(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * travellingSalesmanRecursion(n - 1);
}
//testing the functions
console.log(travellingSalesman(3)); // Output: 6
console.log(travellingSalesmanRecursion(3)); // Output: 6
console.log("end of question 5");
