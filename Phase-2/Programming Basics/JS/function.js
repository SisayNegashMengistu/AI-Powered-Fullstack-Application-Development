function factorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
let fa;
const arrowfunction= fa=>{
if (fa < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    if (fa === 0 || fa === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= fa; i++) {
        result *= i;
    }
    return result;
};

console.log(`Factorial of  using arrow function is:", arrowfunction(9)`); 
