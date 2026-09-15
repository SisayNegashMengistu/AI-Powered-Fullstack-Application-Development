
// for Question 1
 /*
 Bitwise Operations
A decimal number can be represented as a sequence of bits. To illustrate:

6 = 00000110
23 = 00010111
From the bitwise representation of numbers, we can calculate the bitwise AND, bitwise OR and bitwise XOR. Using the example above:

bitwiseAND(6, 23) ➞ 00000110

bitwiseOR(6, 23) ➞ 00010111

bitwiseXOR(6, 23) ➞ 00010001
Write three functions to calculate the bitwise AND, bitwise OR and bitwise XOR of two numbers.
1. pseudocode
1. Bitwise AND
FUNCTION bitwiseAND(a, b)
    Convert a to binary
    Convert b to binary
    Compare the bits of a and b:
        IF both bits are 1
            result bit = 1
        ELSE
            result bit = 0
    Convert the binary result back to decimal
    RETURN result
END FUNCTION
2. Bitwise OR
FUNCTION bitwiseOR(a, b)
    Convert a to binary
    Convert b to binary
    Compare the bits of a and b:
        IF at least one bit is 1
            result bit = 1
        ELSE
            result bit = 0
    Convert the binary result back to decimal
    RETURN result
END FUNCTION
3. Bitwise XOR
FUNCTION bitwiseXOR(a, b)
    Convert a to binary
    Convert b to binary
    Compare the bits of a and b:
        IF the two bits are different
            result bit = 1
        ELSE
            result bit = 0
    Convert the binary result back to decimal
    RETURN result
END FUNCTION
 */
//using literal funcions
function bitwiseANDM1(a, b) {
    return a & b;
}

function bitwiseANDM1(a, b) {
    return a & b;
}

function bitwiseORM1(a, b) {
    return a | b;
}

function bitwiseXORM1(a, b) {
    return a ^ b;
}

// Examples
console.log("Using bitwise AND (Method 1):"); // 4
console.log(bitwiseANDM1(7, 12)); // 4
console.log("Using bitwise OR (Method 1):");  // 15
console.log(bitwiseORM1(7, 12));  // 15
console.log("Using bitwise XOR (Method 1):"); // 11
console.log(bitwiseXORM1(7, 12)); // 11
//using arrow functions
const bitwiseANDArrow = (a, b) => a & b;
const bitwiseORArrow = (a, b) => a | b;
const bitwiseXORArrow = (a, b) => a ^ b;

console.log("Using bitwise AND (Arrow Function):"); // 4
console.log(bitwiseANDArrow(7, 12)); // 4
console.log("Using bitwise OR (Arrow Function):");  // 15
console.log(bitwiseORArrow(7, 12));  // 15
console.log("Using bitwise XOR (Arrow Function):"); // 11
console.log(bitwiseXORArrow(7, 12)); // 11



//using toString method
/*
FUNCTION bitwiseAND(a, b)
    Convert a to binary
    Convert b to binary
    Make both binary strings the same length
    result = empty string
    FOR each position i
        IF a[i] == '1' AND b[i] == '1'
            add '1' to result
        ELSE
            add '0' to result
    Convert result from binary to decimal
    RETURN result
END FUNCTION
 */
function bitwiseANDM2(a, b) {
    // Convert decimal numbers to binary strings
    let binaryA = a.toString(2);
    let binaryB = b.toString(2);

    // Make both strings the same length
    let length = Math.max(binaryA.length, binaryB.length);

    binaryA = binaryA.padStart(length, "0");
    binaryB = binaryB.padStart(length, "0");
    let result = "";
    // Compare each bit
    for (let i = 0; i < length; i++) {
        if (binaryA[i] === "1" && binaryB[i] === "1") {
            result += "1";
        } else {
            result += "0";
        }
    }

    // Convert binary result back to decimal
    return parseInt(result, 2);
}


function bitwiseORM2(a, b) {
    let binaryA = a.toString(2);
    let binaryB = b.toString(2);

    let length = Math.max(binaryA.length, binaryB.length);

    binaryA = binaryA.padStart(length, "0");
    binaryB = binaryB.padStart(length, "0");
    let result = "";
    for (let i = 0; i < length; i++) {
        if (binaryA[i] === "1" || binaryB[i] === "1") {
            result += "1";
        } else {
            result += "0";
        }
    }

    return parseInt(result, 2);
}
function bitwiseXORM2(a, b) {
    let binaryA = a.toString(2);
    let binaryB = b.toString(2);
    let length = Math.max(binaryA.length, binaryB.length);
    binaryA = binaryA.padStart(length, "0");
    binaryB = binaryB.padStart(length, "0");
    let result = "";
    for (let i = 0; i < length; i++) {
        if (binaryA[i] !== binaryB[i]) {
            result += "1";
        } else {
            result += "0";
        }
    }
    return parseInt(result, 2);
}


// Test
console.log(bitwiseANDM2(7, 12)); // 4
console.log(bitwiseORM2(7, 12));  // 15
console.log(bitwiseXORM2(7, 12)); // 11
console.log("End of question 1");