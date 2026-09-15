//Create a function that takes a string and returns a new string with all vowels removed.
/*
1. Pseudocode
FUNCTION removeVowels(string)
    Create an empty result string
    FOR each character in the string
        IF character is NOT a vowel
            Add character to result
    RETURN result
END FUNCTION
The vowels we need to remove are:
a, e, i, o, u
A, E, I, O, U
 */
function removeVowels(string) {
    let result = "";
    for (let i = 0; i < string.length; i++) {
        let character = string[i];
        if (
            character !== "a" &&
            character !== "e" &&
            character !== "i" &&
            character !== "o" &&
            character !== "u" &&
            character !== "A" &&
            character !== "E" &&
            character !== "I" &&
            character !== "O" &&
            character !== "U"
        ) {
            result += character;
        }
    }
    return result;
}
//calling the function
console.log(
    removeVowels("You can make the condition much easier to read.")
);
//using includes methods
function removeVowelsM2(string) {
    let result = "";
    let vowels = "aeiouAEIOU";
    for (let i = 0; i < string.length; i++) {
        if (!vowels.includes(string[i])) {
            result += string[i];
        }
    }
    return result;
}
//calling the function
console.log(removeVowelsM2("I recommend this second version for practice because it clearly shows the algorithm: loop through the string. check whether the character is a vowel. keep it if it isn't."));
console.log("end of question 4");
