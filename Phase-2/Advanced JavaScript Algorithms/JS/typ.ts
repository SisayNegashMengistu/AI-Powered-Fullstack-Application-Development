import * as readline from "readline";
console.log("Hello, TypeScript!");
let sisayName: string = "Sisay";
let isStudent: boolean = true;

function greet(name: string): string {
    return `Hello, ${name}!`;
}

console.log(greet(sisayName));
console.log(` Student: ${isStudent}`);
let myFirstName:string="Sisay",myLastName:string="Negash",myGrandFatherName:string="Mengistu",myMotherName:string="Yezabel",MothersfatherName:string="Melesse",myAge:number=30,myGender:string="Male";
//function to display families information
function displayFamilyInfo(firstName:string,lastName:string,grandFatherName:string,motherName:string,mothersFatherName:string,age:number,gender:string):void{
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Age: ${age}`);
    console.log(`Gender: ${gender}`);
    console.log(`Grandfather's Name: ${grandFatherName}`);
    console.log(`Mother's Name: ${motherName}`);
    console.log(`Father's Name: ${mothersFatherName}`);
  
}
displayFamilyInfo(myFirstName,myLastName,myGrandFatherName,myMotherName,MothersfatherName,myAge,myGender);
//prompt user for input his full name and display it
const rl = readline.createInterface({
    // input: process.stdin,
    // output: process.stdout
});

rl.question("Please enter your full name: ", (fullName: string) => {
    console.log(`Your full name is: ${fullName}`);
    rl.close();
});